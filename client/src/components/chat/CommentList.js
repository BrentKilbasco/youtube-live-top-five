import React from 'react';

import './CommentList.css';
import Comment from './Comment';


let isAtBottom = true;
let messagesEnd = null;


class CommentList extends React.Component {


  // componentDidMount
  //
  componentDidMount() {

    isAtBottom = true;

  }//END componentDidMount



  // componentDidUpdate
  //
  componentDidUpdate(prevProps){

    if ( this.props.isLiveChatEnabled ){

      // We just received some new chat msgs
      if ( isAtBottom ) {

        const behavior = prevProps.items.length === 0 ? 'auto' : 'smooth';
        this.scrollToBottom( behavior );

      }//END if

    }//END if

  }//END componentDidUpdate


  
  // onCommentListScroll
  //
  onCommentListScroll(event) {

    const scrollPos = (event.target.scrollHeight - event.target.scrollTop);

    isAtBottom = (scrollPos === event.target.clientHeight);

  }//END onCommentListScroll



  // scrollToBottom
  //
  scrollToBottom(behavior) {
    
    messagesEnd.scrollIntoView({ 
      behavior,
      block: 'nearest',
      inline: 'start',
    });

    isAtBottom = true;

  }//END scrollToBottom



  // renderCommentItem
  //
  renderCommentItem(item) {
    return (
      <li key={item.id}>
        <Comment 
          className="list-item" 
          author={item.displayName}
          msgText={item.msgText}
          profileImageUrl={item.profileImageUrl}
          publishedAt={item.publishedAt}   
          />
      </li>
    );
  }//END renderCommentItem



  // renderComments
  //
  renderComments() {

    if ( !this.props.isLiveChatEnabled )
      return <div />;

    return (
      <div>
        <ul 
          className="comment-list-wrapper message-list"
          onScroll={(event) => this.onCommentListScroll(event)}>

          {this.props.items.map( (item) => {
            return this.renderCommentItem(item);
          } )}

          <div 
            style={{ float: 'left', clear: 'both', backgroundColor: 'black' }}
            ref={(el) => { messagesEnd = el; }} />

        </ul>
      </div>

    );//END return
  }//END renderComments



  // render
  //
  render() {

    const headerText = this.props.isLiveChatEnabled ? 'Top Chat' : 'Chat Disabled';
    
    return (

      <div className="body">
        <div className="ui minimal comments">

          <h3 className="ui dividing header">{headerText}</h3>

          {this.renderComments()}

        </div>
      </div>

    );//END return
  }//END render


}//END CommentList



export default CommentList;
