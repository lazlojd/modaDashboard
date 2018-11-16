const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const https = require('https');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var adminOpenDesignerChoiceSubmit = false;
const fields = 8
const backstageAdmin = "back5Stage"
var flickrLink
var numReceivedDesignerChoices = 0;


const numDesigners = 20;
var designerData;
//var designerData = {
//   car3cxm:
//     { info: [ 'Caroline Mejia', '3', 'cxm@uchicago.edu', '630.401.5966' ],
//       choices: [[1, 2, 3], [1, 1, 1], [7, 8, 9]],
//       models: []},
//   kir3kel:
//     { info: [ 'Kira Leadholm', '3', 'keleadholm@uchicago.edu', '16122372425' ],
//     choices: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
//     models: []}}



var maxModels = 3;
var activate = false;
var dataFields = []

function makePictureLink(photoObj) {
    if (photoObj !== "undefined") {
        return "https://farm" + photoObj.farm +
            ".staticflickr.com/" + photoObj.server +
            "/" + photoObj.id + "_" +
            photoObj.secret + ".jpg"
    }
}

var data = {rows: [], photos: {}};
var raw = {rows: [], photos: {}};

/*
 * Make photo link with returned photo object
 * match photo links to model information array.
 */
function formatData(dataObj) {
    var photos = dataObj["photos"].photo;
    ////console.log(photos)
    var len = dataObj.rows.length
    var i;
    for (i = 0; i < len; i++) {
        var currentRow = dataObj.rows[i];
        var thisPhoto = photos.filter(current => current["title"].trim() == currentRow[1].trim());
        var result;
        if (thisPhoto.length != 0){
            ////console.log("this photo");
           // //console.log(thisPhoto)
            //console.log(makePictureLink(thisPhoto[0]))

            // add link only if there is none already
            if (currentRow.length == fields) {
                result = makePictureLink(thisPhoto[0])
                dataObj.rows[i].push(result)
            }
        }


    }
    return dataObj
}


setInterval(function() {
   getData().then(function(result) {
      if (result !== "undefined") {
          data = formatData(result)
       }
   })

}, 15000);



app.get('/api/hello', (req, res) => {
    res.send(formatData(data))
});


app.post('/api/codeVerification', (req, res) => {
    var status;
    if (backstageAdmin == req.body.key)
        status = 200
    else
        status = 100
    res.send({status: status})
})

app.post('/api/selection', (req, res) => {

  if (activate) {
      if (typeof(designerData[req.body.code]) == "undefined"){
        res.send("100Error: unknown code - please check that your code is correct");
      } else {
        // Check if designer choices were already received
        if (designerData[req.body.code]["choices"].length == 0)
            numReceivedDesignerChoices =  numReceivedDesignerChoices + 1;

        designerData[req.body.code]["choices"] = req.body.choices
        maxModels = Math.max(maxModels, req.body.choices.length)
        res.send("200Submission successful - your selections have been accepted");
      }
  } else {

      res.send("150Model submissions have not been initiated by backstage administer");
  }
  
});

app.get('/api/activate', (req, res) => {
    activate = !activate
    var message;
    if (activate)
        message = "Activation successful"
    else
        message = "Deactivation successful"
    res.send({message: message});

});

app.get('/api/generate', async function(req, res) {
    console.log("generate - num recieved: " + numReceivedDesignerChoices)
    if (numDesigners != numReceivedDesignerChoices)
        res.send({status: 150, message: "Have not received submissions from all designers"})
    else {
        await matchModelsAndDesigners()
        res.send({status: 200, data: designerData})
    }

});

app.get('/api/showinfo', (req, res) => {
        res.send(designerData);
    });

app.get('/api/update', (req, res) => {
        formatMatchingForSheets()
        writeToSheet()
    });

app.post('/api/flickr', (req, res) => {
  console.log("RECIEVING flickr link------------")
  console.log(req.body)
  flickrLink = req.body.url;
  console.log("------------SET flickr link------------")
  if (flickrLink == req.body.url) res.send({status: 200})

});

function formatMatchingForSheets() {
    let values = [];
    for (var designer in designerData) {
        var designerRow = designerData[designer].info.slice()
        for (var i = 0; i < 4; i++) {
            designerRow.splice(2, 0, '')
        }
        values.push(designerRow)
        var chosenModels = designerData[designer].models
        for (var i = 0; i < chosenModels.length; i++) {
            const result = data.rows.filter((info) => info[1] == chosenModels[i])
            values.push(result[0])
        }
    }
    dataFields = values
}

function designerIteration(keys, takenModels, reverse, selectionNo) {
    console.log("DESIGNER ITERATION")
    if (!reverse) {
        console.log("forward")
        for (let i = 0; i < keys.length; i++) {
            let selection = designerData[keys[i]]["choices"][selectionNo]
             if (typeof(selection) == "undefined")
                            break
            var modelChosen = false
            for (let j = 0; j < selection.length; j++) {
                if (takenModels.indexOf(selection[j]) == -1) {
                    modelChosen = true
                    takenModels.push(selection[j])
                    if (typeof(designerData[keys[i]]["models"]) == "undefined")
                        designerData[keys[i]]["models"] = [selection[j]];
                    else
                        designerData[keys[i]]["models"].push(selection[j]);
                    break;
                }
            }
            if (!modelChosen)
                designerData[keys[i]]["models"].push("Selections exhausted");
        }
    } else {
    // reversed run through
        for (let i = keys.length - 1; i >= 0; i--) {
            console.log(designerData[keys[i]])
            console.log(designerData[keys[i]]["choices"])
            let selection = designerData[keys[i]]["choices"][selectionNo]
            if (typeof(selection) == "undefined")
                continue
            var modelChosen = false
            for (let j = 0; j < selection.length; j++) {
                if (takenModels.indexOf(selection[j]) == -1) {
                    modelChosen = true
                    takenModels.push(selection[j])
                    designerData[keys[i]]["models"].push(selection[j]);
                    break;
                }
            }
            if (!modelChosen)
                designerData[keys[i]]["models"].push("Selections exhausted");
        }
    }
    return takenModels
}

function matchModelsAndDesigners() {
    // Ensure designerData is in ranked order
    var keys = Object.keys(designerData)
    console.log(designerData)
    console.log("keys " + keys + " len: " + keys.length)
    let takenModels = []
    // Run through model selections the maximum number of models chosen
    var reverse = false;
    console.log(maxModels)
    for (let i = 0; i < maxModels; i++) {
        console.log("-------------- run through: " + i)
        console.log("taken: " + takenModels)
        takenModels = designerIteration(keys, takenModels, reverse, i)

        reverse = !reverse
    }
    console.log("--------------ITERATIONS COMPLETE-------------")
    console.log(designerData)

}


const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = 'token.json';


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials, callback) {
    //console.log("authorizing")
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */

function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    var code = '4/kgCwe-tiaYOsPSUfjOET0WPYgHgGhxA0doMjPaKDgJ4REmlyTOvUz4o'

            oAuth2Client.getToken(code, (err, token) => {
                if (err) return //console.error('Error while trying to retrieve access token', err);
                oAuth2Client.setCredentials(token);
                // Store the token to disk for later program executions
                fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                    if (err) console.error(err);
                    console.log('Token stored to', TOKEN_PATH);
                });
                callback(oAuth2Client);
            });
}

//var spreadsheetInfo = {spreadsheetId: '', range: '', dataManip: false}

function getSpreadsheet(auth) {
    ////console.log("get spreadsheet callback")
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
        spreadsheetId: '15l3ewbmyHhmg6kx_jQlZtsAhi8OGEw3FEmhe-9Hs9Uk',
        range: 'B1:I200',
    }, (err, res) => {
        if (err) return //console.log('The API returned an error: ' + err);
        rows = res.data.values;
        if (rows.length) {
            rows.splice(0, 1);
            raw.rows = rows
        } else {
            console.log('No data found.');
        }
    });
}

function getDesignerSpreadsheet(auth) {
    ////console.log("get spreadsheet callback")
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
        spreadsheetId: '1ujcr9u41pr7uDHe9SyiequN0lw8ra9PaT6QCmDTVeT8',
        range: 'A2:D25',
    }, (err, res) => {
        if (err) return //console.log('The API returned an error: ' + err);
        let result = res.data.values;
        if (result.length) {
      
            designerData = formatDesignerData(result)

        } else {
            console.log('No data found.');
        }
    });
}


function writeMatching(auth) {
    var body = {values: dataFields}
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.update({
        spreadsheetId: '1y7wQ83w_HekSYmCiFftDaxICPW0fapGdoDOTh2sL5IA',
        resource: body,
        range: "A1:I200",
        valueInputOption: 'RAW'
    }, (err, response) => {
        if (err) return console.log(err)
        var result = response.result;
        console.log(`${result.updatedCells} cells updated.`);
    })

}


async function writeToSheet() {
    await fs.readFile('credentials.json', (err, content) => {
                if (err) return //console.log('Error loading client secret file:', err);
                // Authorize a client with credentials, then call the Google Sheets API.
                authorize(JSON.parse(content), writeMatching);
            });
}
async function getDesignerInfo() {
    await fs.readFile('credentials.json', (err, content) => {
            if (err) return //console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Sheets API.
            authorize(JSON.parse(content), getDesignerSpreadsheet);
        });
}



function formatDesignerData(data) {
    var obj = {}
    // form designers unique code and append to array of info
    data.map(function(entry) {
        var code = entry[0].slice(0, 3) + entry[1] + entry[2].slice(0, 3);
        obj[code.toLowerCase()] = {info: entry, choices: [], models:[]}
    })
    //console.log(obj)
    return obj
}



async function getData () {
        // get spreadsheet data first
        await fs.readFile('credentials.json', (err, content) => {
            if (err) return //console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Sheets API.
            authorize(JSON.parse(content), getSpreadsheet);
        });
        // Get photos next
       await https.get(flickrLink,
            (resp) => {
            //console.log("htto get has returned")
            let photoData = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                photoData += chunk;
            });
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                raw.photos = JSON.parse(photoData)["photos"]
            });
        }).on("error", (err) => {
        });
       return raw;

}



if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

getDesignerInfo()
app.listen(port, () => console.log(`Listening on port ${port}`));




