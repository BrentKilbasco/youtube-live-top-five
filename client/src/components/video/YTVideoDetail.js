import React from 'react';
import YouTube from 'react-youtube';
import { connect } from 'react-redux';

// Components
import LongDescription from './LongDescription';

// Styles
import './YTVideoDetail.css';



const emptyScreenStyle = {
  alignSelf:'stretch', 
  backgroundColor: 'black', 
  flex: 1, 
  height: 360, 
  width: 640,
};


class YTVideoDetail extends React.Component {


  // constructor
  //
  constructor(props) {
  
    super( props );
    
    this.state = {
      opts: {
        height: 360,
        width: 640,
        playerVars: {
          autoplay: 1,
        },
      },
    };

  }//END constructor



  // _onReady
  //
  _onReady(event){

    event.target.playVideo();

  }//END _onReady



  // renderVideo
  //
  renderVideo(video) {

    if ( video !== null ) {

      return (
        <YouTube
          className="video-player"
          videoId={video.id.videoId}
          opts={this.state.opts}
          onReady={this._onReady}
        />
      );//END return

    } else {

      return <div style={emptyScreenStyle} />;

    }//END if
  
  }//END renderVideo



  // renderDescription
  //
  renderDescription(video) {

    let title = 'Main Title';
    let channelTitle = 'Channel Title';
    let channelImageUrl = '';
    let viewerCount = 0;
    let desc = 'Description';

    if ( video !== null ){

      title = video.snippet.title;
      channelTitle = video.snippet.channelTitle;
      viewerCount = video.viewerCount;
      desc = video.snippet.description;
      channelImageUrl = video.ownerChannelImageUrl;
    
    }//END if

    return (
      <div>
        <h6 className="main-video-title">{title}</h6>          
            
        <small className="main-video-description">
          {viewerCount + ' watching now'}
        </small>

        <LongDescription 
          channelImageUrl={channelImageUrl}
          channelTitle={channelTitle}
          description={desc}
          />
      </div>
    );//END return

  }//END renderDescription



  // render
  //
  render() {

    const { selectedVideo } = this.props;
    
    return (
      <div className="video-detail">
        <div className="video-detail-wrapper">
          
          {this.renderVideo(selectedVideo)}
          {this.renderDescription(selectedVideo)}
        
        </div>
        
        {this.props.children}
        
      </div>
    );//END return

  }//END render


}//END VideoDetail



// mapStateToProps
//
function mapStateToProps({ selectedVideo }) {

  return { 
    selectedVideo,
  };

}//END mapStateToProps


export default connect(mapStateToProps)(YTVideoDetail);
