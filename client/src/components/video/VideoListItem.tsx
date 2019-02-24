import * as React from 'react';
import { connect } from 'react-redux';

import { selectVideo } from '../../actions';

import '../../css/video_components/VideoList.css';

import { ISearchResult } from '../../types';


// Props type declaration
//
type Props = IPropsFromState & IPropsFromActions;

export interface IPropsFromState {
  videoItem: ISearchResult;
};

export interface IPropsFromActions {
  selectVideo: (videoInfo: ISearchResult) => Promise<void>; 
};


// Class declaration
//
class VideoListItem extends React.Component<Props, {}> {


  // render
  //
  public render(): React.ReactNode {
    
    const { videoItem } = this.props;
    const videoData: any = {
      title: videoItem.snippet.title,
      img: videoItem.snippet.thumbnails.default.url,
      channel: videoItem.snippet.channelTitle,
    };

    return (
      <div className="list-group-item">
        <li className="list-item" onClick={() => this.props.selectVideo(videoItem)}>

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


// connect
export default connect(null, { 
  selectVideo,
})(VideoListItem);
