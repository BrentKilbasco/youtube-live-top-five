import React from 'react';
import { connect } from 'react-redux';
import VideoListItem from './VideoListItem';
import './VideoList.css';

import { fetchTopFiveStreams } from '../../actions';


class VideoList extends React.Component {


  // constructor
  //
  constructor(props) {
    
    super( props );

    this.state = {
      rotate: false,
      toggle: false,      
    };

  }//END constructor



  // componentDidMount
  //
  componentDidMount() {

    const el = this.refreshIcon;
    el.addEventListener( 'animationend', () => { this.rotatingDone(); } );

  }//END componentDidMount



  // componentWillUnmount
  //
  componentWillUnmount() {

    const el = this.refreshIcon;
    el.removeEventListener( 'animationend', () => { this.rotatingDone(); } );
  
  }//END componentWillUnmount



  // onRefreshChat
  //
  onRefreshChat() {

    this.setState({ rotate: true });
    this.props.fetchTopFiveStreams();

  }//END onRefreshChat



  // rotatingDone
  //
  rotatingDone() {

    const curToggle = this.state.toggle;

    this.setState({
      rotate: false,
      toggle: !curToggle,
    });

  }//END rotatingDone


  // render
  //
  render() {

    // Mapping all the videos to create each video item
    const videos = this.props.videos.map( (video) => {

      return <VideoListItem {...video} key={video.etag} />;

    });

    const { rotate } = this.state;
    const iconHolderName = 'refresh-btn'  + (rotate ? ' btn-rotate' : '');

    return (

      <div className="video-list-container">

        <br />
        <br />

        <div>
          <h3 className="ui dividing header">

            <div className="video-list-header">
              Top Five Live

              <div 
                className={iconHolderName}
                ref={(el) => { this.refreshIcon = el; }}>
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

}//END VideoList




function mapStateToProps({ videos }) {

  return { videos };

}//END mapStateToProps


export default connect(mapStateToProps, {
  fetchTopFiveStreams,
})(VideoList);
