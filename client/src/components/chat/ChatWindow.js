import React from 'react';
import { connect } from 'react-redux';
import CommentList from './CommentList';

import './ChatWindow.css';

import { fetchChatMessages } from '../../actions';



class ChatWindow extends React.Component {



  // constructor
  //
  constructor(props) {
    
    super( props );

    this.chatRefreshTimer = null;
    
  }//END constructor



  // componentDidUpdate
  //
  componentDidUpdate(prevProps) {

    // Check if the selected video was changed
    //
    const { selectedVideo } = this.props;
    if ( selectedVideo !== null && prevProps.selectedVideo !== selectedVideo)
      if ( prevProps.selectedVideo === null || prevProps.selectedVideo.liveChatId !== selectedVideo.liveChatId )
        if ( selectedVideo.liveChatId !== null )
          this.props.fetchChatMessages( selectedVideo.liveChatId, null );


    // Check if the chat has been updated
    //
    if ( prevProps.chat !== this.props.chat ){

      const { nextPageToken, pollingIntervalMillis } = this.props.chat;

      // If the nextPageToken has changed
      if ( prevProps.chat.nextPageToken !== nextPageToken ){
        if ( nextPageToken !== null && pollingIntervalMillis !== null ){

          const liveChatId = selectedVideo !== null ? selectedVideo.liveChatId : null;

          // Schedule refresh
          clearTimeout( this.chatRefreshTimer );
          this.chatRefreshTimer = setTimeout( () => {

            this.props.fetchChatMessages( liveChatId, nextPageToken );

          }, pollingIntervalMillis * 1.1 );

        }//END if 
      }//END if

    }//END if

  }//END componentDidUpdate



  // render
  //
  render() {
    
    const { chat, selectedVideo } = this.props;
    const isChatEnabled = (selectedVideo !== null) && (selectedVideo.liveChatId !== null);

    return (

      
      <div className="chat-container">

        <CommentList 
          items={chat.items}
          isLiveChatEnabled={isChatEnabled}
          />

        {this.props.children}

        <br />

      </div>
     

    );//END return

  }//END render
  
}//END Comment



function mapStateToProps({ auth, chat, selectedVideo }) {

  return { 
    auth,
    chat,
    selectedVideo,
  };

}//END mapStateToProps


export default connect(mapStateToProps, {
  fetchChatMessages,
})(ChatWindow);
