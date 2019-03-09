import React, { Component } from 'react';
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap';
import VideoCard from '../Base/VideoCard'

// import VideoPlayer from '../Base/VideoPlayer'
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities'
import ReactJWPlayer from 'react-jw-player';


import './Dashboard.css'

const cardsPerPage = 30
var caption = -1
var query = "";
var cycle = -1;
var matches = [];
var transcript = document.getElementById('transcript');
var search = document.getElementById('search');
var match = document.getElementById('match');



class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.updateTranscript = this.updateTranscript.bind(this)
    

    this.state = {
      search: '',
      modal: false,
      availableVideos: [],
      currentVideoLink: "",
      currentTranscriptLink: "",
      captions: [],
      highlighted: {},
    };
  }



  // handleSearch(event) {

  //   this.setState({search: event.target.value.trim()})
  // }
    parse(string) {
      var initialSplit = string.split("\n\n")
      initialSplit.shift();
      let captions = []
      initialSplit.forEach((item, index) => {
        var section = this.parseSection(item);
        //console.log(section)
        if (section !== undefined)
          captions.push(section)

      })
      
      return captions
    }

  parseSection(d) {
      var a = d.split("\n");

      if (a.length !== 1) {
        var i = a[1].indexOf(' --> ');
        var t = a[2];
        if (a[3]) {  t += " " + a[3]; }
        t = t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return {
          begin: this.seconds(a[1].substr(0,i)),
          btext: a[1].substr(3,i-7),
          end: this.seconds(a[1].substr(i+5)),
          text: t
        }
     }
  };

  seconds(s) {
      var a = s.split(':');
      var r = Number(a[a.length-1]) + Number(a[a.length-2]) * 60;
      if(a.length > 2) { r+= Number(a[a.length-3]) * 3600; }
      return r;
    };

    // Toggle modal window
    toggle(index) {
      let videoURL = ""
      let transcriptionURL = ""
      if (Number.isInteger(index)) {
        console.log(index)
        let name = this.state.availableVideos[index]["Key"]
        let videoName = name.replace("transcribed-", "")
        videoName = videoName.replace(".VTT", "")
        let amazonURL = "https://s3.amazonaws.com/"
        videoURL = amazonURL + "devshivideo/" + videoName + ".mp4"
        transcriptionURL = amazonURL + "devshivideotranscribed/" + name
        this.getTrancript(transcriptionURL).then(res => {
          const reader = res.body.getReader()
          reader.read().then(data => {
            var captions = new TextDecoder("utf-8").decode(data.value);
            let text = this.parse(captions)
            console.log(text)
            this.setState(prevState => ({
            modal: !prevState.modal,
            currentVideoLink: videoURL,
            currentTranscriptLink: transcriptionURL,
            captions: text
            }))
          })
        })
        // console.log(videoURL + " -- " + transcriptionURL)
      } else {

        this.setState(prevState => ({
            modal: !prevState.modal
          }))

      }
     
    }

    setResponse(response) {
        this.setState({response: response})
    }

    componentDidMount() {
        this.callApi()
            .then(res => {
                this.setState({
                  availableVideos: res
                })
            })
            .catch(err => console.log(err));
    }


    handleCaptionClick(event) {
      console.log(event)
      if(event.target.id.indexOf("caption") == 0) { 
      var i = Number(event.target.id.replace("caption",""));
      window.jwplayer().seek(this.state.captions[i].begin);
  }
    }


    getTrancript = async (link) => {
      console.log(link)
      const response = await fetch(link);
      // console.log(response)
        //const body = await response.json();

        return response;

    }

    callApi = async () => {
        const response = await fetch('/api/getTranscribedVideos');
        const body = await response.json();


        // if (response.status !== 200) throw Error(body.message);

        return body;
    };


    updateTranscript(event) {
      var p = event.position;
      for(var j=0; j< this.state.captions.length; j++) {
        if(this.state.captions[j].begin < p && this.state.captions[j].end > p) {
          console.log(j + " -- " + caption)
          if(j != caption) {
            var c = document.getElementById('caption'+j);
            if(caption > -1) {
              document.getElementById('caption'+caption).className = "";
            }
            c.className = "current";
            let index = j - 1;
            if (index !== -1)
              document.getElementById('caption'+ index).className = "";
            caption = j;
          }
          break; 
        }
      }
    }



  onKeyDown(e) {
     if(e.keyCode == 27) {
      this.resetSearch();
    } else if (e.keyCode == 13) {
      var q = document.getElementById('search').value.toLowerCase()
      if(q.length > 0) {
        if (q == query) {
          if(cycle >= matches.length - 1) {
            this.cycleSearch(0);
          } else { 
            this.cycleSearch(cycle + 1);
          }
        } else {
          this.resetSearch();
          this.searchTranscript(q);
        }
      } else {
        this.resetSearch();
      }
    }
  }
  






    // Execute search
    searchTranscript(q) {
      matches = [];
      query = q;
      for(var i=0; i<this.state.captions.length; i++) {
        var m = this.state.captions[i].text.toLowerCase().indexOf(q);
        if( m > -1) {
          document.getElementById('caption'+i).innerHTML = 
            this.state.captions[i].text.substr(0,m) + "<em>" + 
            this.state.captions[i].text.substr(m,q.length) + "</em>" + 
            this.state.captions[i].text.substr(m+q.length);
          matches.push(i);
        }
      }
      if(matches.length) {
        this.cycleSearch(0);
      } else {
        this.resetSearch();
      }
    };
    cycleSearch(i) {
      if(cycle > -1) {
        var o = document.getElementById('caption'+matches[cycle]);
        o.getElementsByTagName("em")[0].className = "";
      }
      var c = document.getElementById('caption'+matches[i]);
      c.getElementsByTagName("em")[0].className = "current";
      document.getElementById('match').innerHTML = (i+1) + " of " + matches.length;
       document.getElementById('transcript').scrollTop = c.offsetTop -  document.getElementById('transcript').offsetTop - 40;
      cycle = i;
    };
    resetSearch() {
      if(matches.length) {
        for(var i=0; i<this.state.captions.length; i++) {
          document.getElementById('caption'+i).innerHTML = this.state.captions[i].text;
        }
      }
      query = "";
      matches = [];
      document.getElementById('match').innerHTML = "0 of 0";
      cycle = -1;
       document.getElementById('transcript').scrollTop = 0;
    };



  render() {
    var playlist = [{
        //file: '//content.jwplatform.com/manifests/3p683El7.m3u8',
        file: this.state.currentVideoLink,
        image: '../assets/justiceTextLogo.png',
        tracks: [
          { file: this.state.currentTranscriptLink, kind: "captions" }
        ],
        autostart: "true",
        mute: "false",
        displaytitle: false,
        width: 640,
        height: 360
    }]
    var videos = this.state.availableVideos.map((video, index) => {
      let name = video["Key"].replace("transcribed-", "")
      name = name.replace(".VTT", "")
      return (
        <VideoCard displayName={name} key={index} onClick={() => this.toggle(index)}></VideoCard>
      )
    })

    var transcript = this.state.captions.map((text, index) => {
      console.log(text)
      if (text !== undefined)
        return (<span id={'caption' + index} key={index}> {text.text}</span>)
    })

    var searchInput = this.state.search;

    return (
      <div>
        <div className="mbr-gallery cid-qyXBYIkX4s">
          <div className="mbr-shop">
          <Row>
            <Col>
              <Col className="wrapper-shop-items">
                <div className="mbr-gallery-row">
                 <div className="shop-items">
                  {videos}
                 </div>
                </div>
              </Col>
            </Col>
          </Row>
          </div>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="modalwindow-corrected">

              <Row>
              <Col className="no-padding-right" md="8">

                <ReactJWPlayer
                playerId='jpbNCztc'
                playerScript='https://cdn.jwplayer.com/libraries/jpbNCztc.js'
                playlist={playlist}
                onTime={this.updateTranscript}
              />
              </Col>
              <Col className="no-padding-left" md="4">
                <div className="sidebar sidebar-corrected">
                  <div id="searchbox" className="searchbox">
                  <span id="match" className="match">0 of 0</span>
                  <input id="search" type="search" className="search" onKeyDown={event => this.onKeyDown(event)}/>
                  </div>
                  <div id="transcript" className="transcript" onClick ={(event) => this.handleCaptionClick(event)}>
                  {transcript}
                  </div>
                </div>
                </Col>
               </Row>
        </Modal>
      </div>

      
    );
  }
}

export default Dashboard;
