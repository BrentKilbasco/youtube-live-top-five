import * as React from 'react';
import YouTube from 'react-youtube';
import { connect } from 'react-redux';

// Components
import LongDescription from './LongDescription';

// Data types
import { ISelectedVideo, IStoreState } from '../../types';

// Styles
import '../../css/video_components/YTVideoDetail.css';



const emptyScreenStyle: React.CSSProperties = {
  alignSelf:'stretch', 
  backgroundColor: 'black', 
  flex: 1, 
  height: 360, 
  width: 640,
};


// Props & State type declaration
//
type Props = IProps;

export interface IProps {
  selectedVideo: ISelectedVideo;
};//END IProps

export interface IState {
  opts: {
    height: string,
    width: string,
    playerVars: {
      autoplay: 0 | 1,
    },
  },
};//END IState


// Class declaration
//
class YTVideoDetail extends React.Component<Props, IState> {


  // constructor
  //
  constructor(props: IProps) {
  
    super( props );
    
    this.state = {
      opts: {
        height: '360',
        width: '640',
        playerVars: {
          autoplay: 1,
        },
      },
    };

  }//END constructor



  // render
  //
  public render(): React.ReactNode {

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



  // _onReady
  //
  private _onReady(event: { target: any }): void {

    event.target.playVideo();

  }//END _onReady



  // renderVideo
  //
  private renderVideo(video: ISelectedVideo): JSX.Element {

    if ( video.isDataLoaded ) {

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
  private renderDescription(video: ISelectedVideo): JSX.Element {

    const title = video.snippet.title;
    const channelTitle = video.snippet.channelTitle;
    const viewerCount = video.viewerCount;
    const desc = video.snippet.description;
    const channelImageUrl = video.ownerChannelImageUrl;

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

}//END VideoDetail



// mapStateToProps
//
function mapStateToProps({ selectedVideo }: IStoreState): IProps {

  return { selectedVideo };

}//END mapStateToProps


export default connect(mapStateToProps)(YTVideoDetail);
