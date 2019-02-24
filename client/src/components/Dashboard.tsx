import * as React from 'react';
import { connect } from 'react-redux';

// Components
import YTVideoDetail from './video/YTVideoDetail';
import ChatWindow from './chat/ChatWindow';
import VideoList from './video/VideoList';

// Actions
import { fetchTopFiveStreams, selectVideo } from '../actions';

// Dummy data list
import { items } from '../utils/fallbackVidItems';

// Types
import { ISearchResult } from '../types';

// Styles
import '../css/Dashboard.css';



export interface IProps {
  fetchTopFiveStreams: () => Promise<void>; 
  selectVideo: (video: ISearchResult) => Promise<void>; 
};


class Dashboard extends React.Component<IProps, {}> {


  // componentDidMount
  //
  public componentDidMount(): void {

    this.props.fetchTopFiveStreams();
    
    // Auto play that funky music
    const autoPlayVid = items[0];
    this.props.selectVideo( autoPlayVid );    

  }//END componentDidMount



  // render
  //
  public render(): React.ReactNode {
    
    return ( 
      <div className="dashboard-body">
          
        <YTVideoDetail>

          <ChatWindow>
            <VideoList />
          </ChatWindow>

        </YTVideoDetail>          

      </div>
    );//END return
    
  }//END render

}//END class Dashboard


export default connect(null, { 
  fetchTopFiveStreams,
  selectVideo,
})(Dashboard);
