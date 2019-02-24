import * as React from 'react';


// Prop type declaration
//
export interface IProps {
  className: string;
  author: string;
  msgText: string;
  profileImageUrl: string;
  publishedAt: string;
}//END IProps


// Class declaration
//
class Comment extends React.PureComponent<IProps, {}> {

  // render
  //
  public render(): React.ReactNode {

    return (
      <div className="comment">

        <a className="avatar">
          <img src={this.props.profileImageUrl} />
        </a>

        <div className="content">

          <a className="author">{this.props.author}</a>
          <div className="metadata">
            <span className="date">{this.props.publishedAt}</span>
          </div>

          <div className="text">
            {this.props.msgText}
          </div>

        </div>

      </div>
    );//END return

  }//END render

};//END Comment


export default Comment;
