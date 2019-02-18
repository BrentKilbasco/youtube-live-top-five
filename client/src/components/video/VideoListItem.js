import React from 'react';
import { connect } from 'react-redux';

import { selectVideo } from '../../actions';

import './VideoList.css';


class VideoListItem extends React.Component {

  render() {
    
    const videoData = {
      title: this.props.snippet.title,
      img: this.props.snippet.thumbnails.default.url,
      channel: this.props.snippet.channelTitle,
    };

    return (
      <div className="list-group-item">
        <li className="list-item" onClick={() => this.props.selectVideo(this.props)}>

          <img src={videoData.img} alt={videoData.title} className="thumbnail" />
          
          <div className="text-container video-desc-text">
            <span className="video-list-title">{videoData.title}</span>
            <br />
            <small className="channelName">{videoData.channel}</small>
          </div>

        </li>
      </div>
    );

  }//END render
  
}//END class VideoListItem



function mapStateToProps({ selectedVideo }) {

  return { selectedVideo };

}//END mapStateToProps


export default connect(mapStateToProps, { 
  selectVideo,
})(VideoListItem);
