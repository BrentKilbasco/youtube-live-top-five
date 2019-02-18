import React from 'react';


const Comment = (props) => {

  return (

    <div className="comment">

      <a className="avatar">
        <img src={props.profileImageUrl} />
      </a>
      <div className="content">
        <a className="author">{props.author}</a>
        <div className="metadata">
          <span className="date">{props.publishedAt}</span>
        </div>
        <div className="text">
          {props.msgText}
        </div>

      </div>

    </div>

  );//END return

};//END Comment



export default Comment;
