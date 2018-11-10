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

// API calls



// var data = {
//     rows: [],
//     photos: {}
// }

var adminOpenDesignerChoiceSubmit = false;

const backstageAdmin = "1234"
const flickrLink = 'https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=a2cd5a26f44f57488b0856f13fd25911&user_id=144887162%40N03&format=json&nojsoncallback=1&auth_token=72157673338599837-ff24249e2f7bc088&api_sig=e9a60824f7f34906d3d0e3ac58a870e3'
var numReceivedDesignerChoices = 0;


const numDesigners = 2;
//var designerData;
var designerData = {
   car3cxm:
     { info: [ 'Caroline Mejia', '3', 'cxm@uchicago.edu', '630.401.5966' ],
       choices: [['1', '2', '3'],  [ '4', '5', '6' ], [ '7', '8', '9' ] ]},
   kir3kel:
     { info: [ 'Kira Leadholm', '3', 'keleadholm@uchicago.edu', '16122372425' ],
     choices: [['1', '2', '3'],  [ '4', '5', '6' ], [ '7', '8', '9' ] ]}}


var maxModels = 3;
var activate = false;


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

            // add link if there is none already
            if (currentRow.length == 6) {
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
          console.log("FORMATTING")
          console.log(formatData(result))
          data = formatData(result)
          console.log("NEW---------")
          console.log(data)
          //fs.writeFile('data.json', JSON.stringify(formatData(result)), (err) => {
//            if (err) throw err;
//            console.log("data written!")
//          })
       }
   })

}, 15000);



app.get('/api/hello', (req, res) => {

    // Send data stored in local data.json file
    //let raw = fs.readFileSync('data.json').then(result => result).catch(err => console.log(err));
    //console.log(JSON.parse(raw))
    console.log("preparing to send -----")
    console.log(data)
    res.send(formatData(data))
});


app.post('/api/codeVerification', (req, res) => {
    var status;
    //console.log(backstageAdmin + " -- " + req.body.key)
    if (backstageAdmin == req.body.key)
        status = 200
    else
        status = 100
    //console.log("sending status " + status)
    res.send({status: status})
})

app.post('/api/selection', (req, res) => {

  if (activate) {
      //console.log(req.body);
      //console.log(typeof(designerData[req.body.code]))
      if (typeof(designerData[req.body.code]) == "undefined"){
        //console.log("sending error!")

        res.send("100Error: unknown code - please check that your code is correct");
      } else {
        // Check if designer choices were already received
        console.log(req.body)
        console.log(designerData[req.body.code]["choices"])
        if (designerData[req.body.code]["choices"].length == 0)
            numReceivedDesignerChoices =  numReceivedDesignerChoices + 1;
        console.log("num recieved: " + numReceivedDesignerChoices)
        designerData[req.body.code]["choices"] = req.body.choices
        maxModels = Math.max(maxModels, req.body.choices.length)
        //console.log(designerData[req.body.code]["choices"])

        res.send("200Submission successful - your selections have been accepted");
      }
  } else {

      res.send("150Model submissions have not been initiated by backstage administer");
  }
  
});

app.get('/api/activate', (req, res) => {
    //console.log("entered!")
    activate = !activate
    var message;
    if (activate)
        message = "Activation successful"
    else
        message = "Deactivation successful"
    res.send({message: message});

});

app.get('/api/generate', (req, res) => {
    console.log("generate - num recieved: " + numReceivedDesignerChoices)
    if (numDesigners != numReceivedDesignerChoices)
        res.send({message: "100Have not received submissions from all designers"})
    else {
        //console.log(designerData)
        matchModelsAndDesigners()
    }

});

app.get('/api/showinfo', (req, res) => {
        res.send(designerData);
    });

function designerIteration(keys, takenModels, reverse, selectionNo) {
    if (!reverse) {
        console.log("forward")
        for (let i = 0; i < keys.length; i++) {
            let selection = designerData[keys[i]]["choices"][selectionNo]
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
            let selection = designerData[keys[i]]["choices"][selectionNo]
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
    console.log("keys " + keys + " len: " + keys.length)
    let takenModels = []
    // Run through model selections the maximum number of models chosen
    for (let i = 0; i < maxModels; i++) {
        console.log("taken: " + takenModels)
        var reverse;
        if (i % 2 == 0)
            reverse = false
        else
            reverse = true
        takenModels = designerIteration(keys, takenModels, reverse, i)
    }
    console.log(designerData)

}


const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';


// Load client secrets from a local file.
// fs.readFile('credentials.json', (err, content) => {
//     if (err) return //console.log('Error loading client secret file:', err);
//     // Authorize a client with credentials, then call the Google Sheets API.
//     authorize(JSON.parse(content), getSpreadsheet);
// });

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
    //console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return //console.error('Error while trying to retrieve access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) console.error(err);
                //console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

//var spreadsheetInfo = {spreadsheetId: '', range: '', dataManip: false}

function getSpreadsheet(auth) {
    ////console.log("get spreadsheet callback")
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
        spreadsheetId: '1ZctufBfnKG_D1OCOxnJsG1uc99mace4wM95uz2x4EcY',
        range: 'B1:G15',
    }, (err, res) => {
        if (err) return //console.log('The API returned an error: ' + err);
        rows = res.data.values;
        if (rows.length) {
            rows.splice(0, 1);
            raw.rows = rows
            ////console.log("printing first row")
            //console.log(rows[1]);
            // Print columns A and E, which correspond to indices 0 and 4.

        } else {
            //console.log('No data found.');
        }
    });
}

function getDesignerSpreadsheet(auth) {
    ////console.log("get spreadsheet callback")
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
        spreadsheetId: '1f0Sedf7yeI7gBZ8u2l_27eNiIETAdKHLalQMfhSTO3g',
        range: 'A2:D25',
    }, (err, res) => {
        if (err) return //console.log('The API returned an error: ' + err);
        let result = res.data.values;
        if (result.length) {
      
            designerData = formatDesignerData(result)
            ////console.log("printing first row")
            ////console.log(designerData);
            // Print columns A and E, which correspond to indices 0 and 4.

        } else {
            //console.log('No data found.');
        }
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
        obj[code.toLowerCase()] = {info: entry, choices: []}
    })
    //console.log(obj)
    return obj
}



async function getData () {
    // Check if data object is open
    //console.log("entering data block: " + data.rows.length)

        // get spreadsheet data first
        //console.log("getting spreadsheet")
        await fs.readFile('credentials.json', (err, content) => {
            if (err) return //console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Sheets API.
            authorize(JSON.parse(content), getSpreadsheet);
        });
        //console.log("spreadsheet block done: " + data.rows[0])
        //console.log("getting photos")
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
                //console.log("have photo data" + photoData)

            });
            //console.log(data.rows[0])
        }).on("error", (err) => {
            //console.log("Error: " + err.message);
        });

      // console.log(data)

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

//getDesignerInfo()
app.listen(port, () => console.log(`Listening on port ${port}`));




