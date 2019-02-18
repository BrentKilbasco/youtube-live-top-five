import axios from 'axios';

import { 
  FETCH_USER,  
  FETCH_TOP_LIVE_STREAMS,   
  FETCH_CHAT_MSGS, 
  FETCH_CHAT_MSGS_BEGIN,
  SELECT_VIDEO, 
} from './types';


import youTubeFaker from '../utils/youTubeFaker';

// Url strings
import top5LiveStreams from '../urls/topFiveLiveStreams';
import liveChatFeedURL from '../urls/liveChatFeed';
import liveStreamingDetailsURL from '../urls/liveStreamingDetails';
import youtubeChannelDetails from '../urls/youtubeChannelDetails';

import dummyVidList from '../utils/fallbackVidItems.json';



const USE_FAKE_DATA__TOP_FIVE = false;
const USE_FAKE_DATA__CHAT_MSGS = false;



// fetchUser
//
export const fetchUser = () => async (dispatch) => {

  const res = await axios.get( '/api/current_user' );
  dispatch({ type: FETCH_USER, payload: res.data });

};// END fetchUser



// fetchTopFiveStreams
//
export const fetchTopFiveStreams = () => async (dispatch) => {
  
  let res; 
  let payload;

  if ( !USE_FAKE_DATA__TOP_FIVE ){

    res = await axios.get( top5LiveStreams.getURL() );
    payload = res.data.items;

    if ( payload.length < 1 ){
      
      payload = dummyVidList;
      console.log( 'Top 5 search responded with no results. Falling back to default list.' );

    }//END if
  
  } else
    payload = dummyVidList;

  dispatch({ type: FETCH_TOP_LIVE_STREAMS, payload });

};//END fetchTopFiveStreams



// fetchChatMessages
//
export const fetchChatMessages = (liveChatId, pageToken = null) => async (dispatch) => {

  let res;
  let type;
  let payload;

  if ( !USE_FAKE_DATA__CHAT_MSGS ) {
    
    type = pageToken === null ? FETCH_CHAT_MSGS_BEGIN : FETCH_CHAT_MSGS;
    res = await axios.get( liveChatFeedURL.getURL(liveChatId, pageToken) );
    payload = res.data;

  } else {

    type = FETCH_CHAT_MSGS;
    payload = youTubeFaker.getLiveChatResponse().data;

  }//END if/else

  dispatch({ type, payload });

};//END fetchChatMessages



// selectVideo
//
export const selectVideo = (selectedVideo) => async dispatch => {

  // Get the liveStreamingDetails from the 'Video' endpoint, so we can get the activeLiveChatID
  const vidId = selectedVideo.id.videoId;
  const res = await axios.get( liveStreamingDetailsURL.getURL(vidId) );
  if ( res.data.items.length < 1 ) {
    console.log( 'LIVE STREAMING DETAILS NOT FOUND FOR ID: ' + vidId );
    return;
  }//END if

  // Cache the video item
  const thisItem = res.data.items[0];
  let liveChatId = null;

  // Get the owner channel avatar
  //
  const avatarRes = await axios.get( youtubeChannelDetails.getURL(selectedVideo.snippet.channelId) );
  let avatarUrl = '';

  if ( avatarRes.status === 200 )
    avatarUrl = avatarRes.data.items[0].snippet.thumbnails.default.url;


  // Search for an activeLiveChatId key. If there is none, assume the live chat is disabled.  
  if (  ('liveStreamingDetails' in thisItem) && ('activeLiveChatId' in thisItem.liveStreamingDetails) )
    liveChatId = thisItem.liveStreamingDetails.activeLiveChatId;

  // Set the initial concurrent viewer count with the live streaming details info
  const viewerCount = thisItem.liveStreamingDetails.concurrentViewers || '---';
  let videoPayload = JSON.parse( JSON.stringify( selectedVideo ) );
  
  // Add all data to the payload object
  videoPayload.ownerChannelImageUrl = avatarUrl;
  videoPayload.liveChatId = liveChatId;
  videoPayload.viewerCount = viewerCount;
  videoPayload.liveStreamingDetails = thisItem.liveStreamingDetails;


  dispatch({ type: SELECT_VIDEO, payload: videoPayload });

};//END selectVideo


