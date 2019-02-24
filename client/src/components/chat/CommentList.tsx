import * as React from 'react';

import Comment from './Comment';

import { IChatItemFlattened } from '../../types';

import '../../css/chat_components/CommentList.css';


// Prop & State type declaration
//
export interface IProps {
  items: IChatItemFlattened[];
  isLiveChatEnabled: boolean;
};//END IProps

export interface IState {
  isAtBottom: boolean;
  messagesEnd: HTMLDivElement;
};//END IState



// Class declaration
//
class CommentList extends React.Component<IProps, IState> {


  // componentDidMount
  //
  public componentDidMount(): void {

    this.setState({ isAtBottom: true });

  }//END componentDidMount



  // componentShouldUpdate
  //
  public shouldComponentUpdate(nextProps: IProps, nextState: IState): boolean {

    // Check if the props have changed
    if ( nextProps !== this.props ){
      return true;
    }else{
      return false;
    }//END if/else

  }//END componentShouldUpdate



  // componentDidUpdate
  //
  public componentDidUpdate(prevProps: IProps): void {

    if ( this.props.isLiveChatEnabled ){

      // We just received some new chat msgs
      if ( this.state.isAtBottom ) {

        const behavior: 'auto' | 'smooth' = prevProps.items.length === 0 ? 'auto' : 'smooth';
        this.scrollToBottom( behavior );

      }//END if

    }//END if

  }//END componentDidUpdate



  // render
  //
  public render(): React.ReactNode {

    const headerText: string = this.props.isLiveChatEnabled ? 'Top Chat' : 'Chat Disabled';
    
    return (
      <div className="body">
        <div className="ui minimal comments">

          <h3 className="ui dividing header">{headerText}</h3>

          {this.renderComments()}

        </div>
      </div>
    );//END return

  }//END render


  
  // onCommentListScroll
  //
  private onCommentListScroll(event: React.UIEvent<HTMLUListElement>): void {

    if ( !event || event === null )
      return;

    // Cast target to HTML UList Element
    const castTarget: HTMLUListElement = ((event.target) as HTMLUListElement);
    if ( !castTarget || castTarget === null )
      return;

    const { scrollHeight, scrollTop, clientHeight } = castTarget;
    const scrollPos: number = (scrollHeight - scrollTop);
    const newAtBottom: boolean = (scrollPos === clientHeight);
    
    if ( this.state.isAtBottom !== newAtBottom )
      this.setState({ isAtBottom: newAtBottom });

  }//END onCommentListScroll



  // scrollToBottom
  //
  private scrollToBottom(behavior: 'auto' | 'smooth'): void {

    if ( this.state.messagesEnd === undefined )
      return;    

    const options: ScrollIntoViewOptions = {
      behavior,
      block: 'nearest',
      inline: 'start',
    };

    this.state.messagesEnd.scrollIntoView( options );
    this.setState({ isAtBottom: true });

  }//END scrollToBottom



  // renderCommentItem
  //
  private renderCommentItem(item: IChatItemFlattened): JSX.Element {
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



  // setScrollToTargetRef
  //
  private setScrollToTargetRef(el: HTMLDivElement): void {

    if ( !el || el === null )
      return;
    
    this.setState({ messagesEnd: el }); 

  }//END setScrollToTargetRef



  // renderComments
  //
  private renderComments(): JSX.Element {

    if ( !this.props.isLiveChatEnabled )
      return <div />;

    return (
      <div>
        <ul 
          className="comment-list-wrapper message-list"
          onScroll={ (event: React.UIEvent<HTMLUListElement>) => this.onCommentListScroll(event) }>

          {this.props.items.map( (item) => {
            return this.renderCommentItem(item);
          } )}

          <div 
            style={{ float: 'left', clear: 'both', backgroundColor: 'black' }}
            ref={(el: HTMLDivElement) => { this.setScrollToTargetRef(el); }} />

        </ul>
      </div>

    );//END return
  }//END renderComments


}//END CommentList


export default CommentList;
