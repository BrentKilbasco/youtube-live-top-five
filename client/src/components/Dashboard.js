import React from 'react';
import { connect } from 'react-redux';

// Components
import YTVideoDetail from './video/YTVideoDetail';
import ChatWindow from './chat/ChatWindow';
import VideoList from './video/VideoList';

// Actions
import { fetchTopFiveStreams, selectVideo } from '../actions';

// Dummy data list
import fallbackList from '../utils/fallbackVidItems.json';

// Styles
import './Dashboard.css';



class Dashboard extends React.Component {


  // componentDidMount
  //
  componentDidMount() {

    this.props.fetchTopFiveStreams();
    
    // Auto play that funky music
    const autoPlayVid = fallbackList[0];
    this.props.selectVideo( autoPlayVid );    

  }//END componentDidMount



  // render
  //
  render() {
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
