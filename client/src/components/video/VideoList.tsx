import * as React from 'react';
import { connect } from 'react-redux';
import VideoListItem from './VideoListItem';

import { fetchTopFiveStreams } from '../../actions';

import { ISearchResult, IStoreState } from '../../types';

import '../../css/video_components/VideoList.css';


// Prop & State type declaration
//
type Props = IPropsFromState & IPropsFromActions;

export interface IPropsFromState {
  videos: ISearchResult[];
};//END IPropsFromState

export interface IPropsFromActions {
  fetchTopFiveStreams: () => Promise<void>;
};//END IProps

export interface IState {
  rotate: boolean,
  toggle: boolean,
};


let refreshIcon: HTMLDivElement;


// Class Declaration
//
class VideoList extends React.Component<Props, IState> {


  // constructor
  //
  constructor(props: Props) {
    
    super( props );

    this.state = {
      rotate: false,
      toggle: false,      
    };

  }//END constructor



  // shouldComponentUpdate
  //
  public shouldComponentUpdate(nextProps: Props, nextState: IState): boolean {

    // Check if the props have changed
    if ( nextProps !== this.props || nextState !== this.state ){
      return true;
    }else{
      return false;
    }//END if/else

  }//END shouldComponentUpdate



  // componentDidMount
  //
  public componentDidMount(): void {

    const el = refreshIcon;
    el.addEventListener( 'animationend', () => { this.rotatingDone(); } );

  }//END componentDidMount



  // componentWillUnmount
  //
  public componentWillUnmount(): void {

    const el = refreshIcon;
    el.removeEventListener( 'animationend', () => { this.rotatingDone(); } );
  
  }//END componentWillUnmount



  // render
  //
  public render(): React.ReactNode {

    // Mapping all the videos to create each video item
    const videos = this.props.videos.map( (video) => {
      return <VideoListItem videoItem={video} key={video.etag} />;
    });

    const { rotate } = this.state;
    const iconHolderName = 'refresh-btn'  + (rotate ? ' btn-rotate' : '');

    return (
      <div className="video-list-container">

        <br /><br />

        <div>
          <h3 className="ui dividing header">

            <div className="video-list-header">
              Top Five Live

              <div 
                className={iconHolderName}
                ref={(el: HTMLDivElement) => { if( el && el !== null ) refreshIcon = el; }}>
                <i 
                  className="refresh icon link" 
                  onClick={() => { this.onRefreshChat() }} />
              </div>              
            </div>

          </h3>          
        </div>

        <ul className="video-list-wrapper">
          {videos}
        </ul>

      </div>
    );//END return

  }//END render



  // onRefreshChat
  //
  private onRefreshChat(): void {

    this.setState({ rotate: true });
    this.props.fetchTopFiveStreams();

  }//END onRefreshChat



  // rotatingDone
  //
  private rotatingDone(): void {

    const curToggle = this.state.toggle;

    this.setState({
      rotate: false,
      toggle: !curToggle,
    });

  }//END rotatingDone


}//END VideoList




function mapStateToProps({ videos }: IStoreState): IPropsFromState {

  return { videos };

}//END mapStateToProps



export default connect(mapStateToProps, {
  fetchTopFiveStreams
})(VideoList);

