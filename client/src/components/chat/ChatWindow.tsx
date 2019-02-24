import * as React from 'react';
import { connect } from 'react-redux';
import CommentList from './CommentList';

import '../../css/chat_components/ChatWindow.css';

import { fetchChatMessages } from '../../actions';

import { IAuth, IChat, ISelectedVideo, IStoreState } from '../../types';


// Props & State type declaration
//
type IProps = IPropsFromState & IPropsFromActions;

export interface IPropsFromState {
  auth: IAuth;
  chat: IChat;
  selectedVideo: ISelectedVideo;  
};//END IPropsFromState

export interface IPropsFromActions {
  fetchChatMessages: (liveChatId: string, nextPageToken: string | null) => Promise<void>; 
};//END IPropsFromActions

export interface IState {
  chatRefreshTimer: number;
};//END IState


// Class declaration
//
class ChatWindow extends React.Component<IProps, IState> {


  // constructor
  //
  constructor(props: IProps) {
    super( props );

    this.state = {
      chatRefreshTimer: 0,
    };

  }//END constructor


  
  // componentShouldUpdate
  //
  public shouldComponentUpdate(nextProps: IProps, nextState: IState): boolean {

    // Check if the props have changed
    if ( nextProps !== this.props ){
      //console.log( 'CHAT WINDOW: UPDATING COMPONENT' );
      return true;
    }else{
      //console.log( 'CHAT WINDOW: NOT UPDATING COMPONENT' );
      return false;
    }//END if/else
    
  }//END componentShouldUpdate



  // componentDidUpdate
  //
  public componentDidUpdate(prevProps: IProps): void {

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
        if ( selectedVideo !== null && nextPageToken !== null && pollingIntervalMillis !== null ){

          // Schedule refresh timer
          window.clearTimeout( this.state.chatRefreshTimer );
          this.setState({ chatRefreshTimer: window.setTimeout( () => {
              this.props.fetchChatMessages( selectedVideo.liveChatId, nextPageToken );
            }, 
            parseInt(pollingIntervalMillis, 10) * 1.1 )});

        }//END if 
      }//END if

    }//END if

  }//END componentDidUpdate



  // render
  //
  public render(): React.ReactNode {
    
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



function mapStateToProps({ auth, chat, selectedVideo }: IStoreState): IPropsFromState {
  return { 
    auth,
    chat,
    selectedVideo,
  };
}//END mapStateToProps


export default connect(mapStateToProps, {
  fetchChatMessages,
})(ChatWindow);
