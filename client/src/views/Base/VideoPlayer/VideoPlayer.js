import React, { Component } from 'react';


class VideoPlayer extends Component {
  constructor(props) {
    super(props)

  }




  render() {
    return (
         <div className="player-container">
          <div id="player"></div>
          <div className="sidebar">
            <div id="searchbox" className="searchbox">
            <span id="match" className="match">0 of 0</span>
            <input id="search" type="search" className="search" />
            </div>
            <div id="transcript" className="transcript"></div>
          </div>
         </div>
         <div className="caption-copy"></div>
    );
  }
}

export default VideoPlayer;
