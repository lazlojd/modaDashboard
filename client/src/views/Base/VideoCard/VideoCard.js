import React, { Component } from 'react';
import { Button } from 'reactstrap';

class VideoCard extends Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
         <div className="mbr-gallery-item" onClick={() => this.handleClick()}>
          <div className="item_overlay"></div>
          <div className="galleryItem">
            <div className="style_overlay"></div>
            <div className="img_wrapper">
              <img src="https://mobirise.com/extensions/storem4/assets/images/shop0.jpg" alt="video thumbnail"/>
            </div>
            <div className="sidebar_wraper">
              <h4 className="item-title mbr-fonts-style mbr-text display-5">
                {this.props.displayName}
              </h4>
            </div>
          </div>
         </div>
    );
  }
}

export default VideoCard;
