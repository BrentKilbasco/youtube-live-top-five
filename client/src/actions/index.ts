import axios from 'axios';
import { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';

// Action types
import { 
  FETCH_USER,  
  FETCH_TOP_LIVE_STREAMS,   
  FETCH_CHAT_MSGS, 
  FETCH_CHAT_MSGS_BEGIN,
  SELECT_VIDEO, 
} from './types';

// Data types
import { 
  IFetchUserAction, 
  IFetchTopFiveAction, 
  ISelectVideoAction,
  IFetchChatAction,
} from '../types/actions';

// Url strings
import top5LiveStreams from '../urls/topFiveLiveStreams';
import liveChatFeedURL from '../urls/liveChatFeed';
import liveStreamingDetailsURL from '../urls/liveStreamingDetails';
import youtubeChannelDetails from '../urls/youtubeChannelDetails';


import { IAuth, IChat, ISearchResult, ISelectedVideo } from '../types';

// Helper functions
import parseYouTubeChatPayload from '../utils/parseYouTubeChatPayload';
import isObjectEmpty from '../utils/isObjectEmpty';

// Fake data
import { items as fallbackItems } from '../utils/fallbackVidItems';
import youTubeFaker from '../utils/youTubeFaker';


const USE_FAKE_DATA__TOP_FIVE = false;
const USE_FAKE_DATA__CHAT_MSGS = false;



// fetchUser
//
export const fetchUser = () => async (dispatch: Dispatch<IFetchUserAction>) => {

  const res: AxiosResponse = await axios.get( '/api/current_user' );
  
  // If no user data returned, created an empty userdata
  let data: IAuth = { _id: '', googleId: '', credits: 0 };

  if ( !isObjectEmpty( res.data ) ){
    
    const castedData: IAuth = res.data as IAuth;
    data = { 
      _id: castedData._id, 
      googleId: castedData.googleId, 
      credits: castedData.credits,
    };

  }//END if

  dispatch({ type: FETCH_USER, payload: data });

};// END fetchUser



// fetchTopFiveStreams
//
export const fetchTopFiveStreams = () => async (dispatch: Dispatch<IFetchTopFiveAction>) => {
  
  let res: AxiosResponse; 
  let payload: ISearchResult[];

  if ( !USE_FAKE_DATA__TOP_FIVE ){

    res = await axios.get( top5LiveStreams.getURL() );
    payload = res.data.items as ISearchResult[];

    if ( payload.length < 1 ){
      
      payload = fallbackItems;
      console.info( 'Top 5 search responded with no results. Falling back to default list.' );

    }//END if
  
  } else
    payload = fallbackItems;

  dispatch({ type: FETCH_TOP_LIVE_STREAMS, payload });

};//END fetchTopFiveStreams



// fetchChatMessages
//
export const fetchChatMessages = (liveChatId: string, pageToken: string) => async (dispatch:Dispatch<IFetchChatAction>) => {

  let res: AxiosResponse;
  let type: FETCH_CHAT_MSGS_BEGIN | FETCH_CHAT_MSGS;
  let payload: IChat;

  if ( !USE_FAKE_DATA__CHAT_MSGS ) {
    
    type = pageToken === null ? FETCH_CHAT_MSGS_BEGIN : FETCH_CHAT_MSGS;
    res = await axios.get( liveChatFeedURL.getURL(liveChatId, pageToken) );
    payload = parseYouTubeChatPayload( res.data );

  } else {

    type = FETCH_CHAT_MSGS;
    payload = parseYouTubeChatPayload( youTubeFaker.getLiveChatResponse().data );

  }//END if/else

  dispatch({ type, payload });

};//END fetchChatMessages



// selectVideo
//
export const selectVideo = (selectedVideo: ISearchResult) => async (dispatch: Dispatch<ISelectVideoAction>) => {

  // Get the liveStreamingDetails from the 'Video' endpoint, so we can get the activeLiveChatID
  const vidId: string = selectedVideo.id.videoId;
  const res: AxiosResponse = await axios.get( liveStreamingDetailsURL.getURL(vidId) );
  if ( res.data.items.length < 1 ) {
    console.warn( 'LIVE STREAMING DETAILS NOT FOUND FOR ID: ' + vidId );
    return;
  }//END if

  // Cache the video item
  const thisItem = res.data.items[0];
  let liveChatId: string = '';

  // Get the owner channel avatar
  //
  const avatarRes: AxiosResponse = await axios.get( youtubeChannelDetails.getURL(selectedVideo.snippet.channelId) );
  let avatarUrl: string = '';
  if ( avatarRes.status === 200 )
    avatarUrl = avatarRes.data.items[0].snippet.thumbnails.default.url;


  // Search for an activeLiveChatId key. If there is none, assume the live chat is disabled.  
  if (  ('liveStreamingDetails' in thisItem) && ('activeLiveChatId' in thisItem.liveStreamingDetails) )
    liveChatId = thisItem.liveStreamingDetails.activeLiveChatId;

  // Set the initial concurrent viewer count with the live streaming details info
  const viewerCount: string = thisItem.liveStreamingDetails.concurrentViewers || '---';
  const videoPayload: ISelectedVideo = JSON.parse( JSON.stringify( selectedVideo ) );
  
  // Add all data to the payload object
  videoPayload.ownerChannelImageUrl = avatarUrl;
  videoPayload.liveChatId = liveChatId;
  videoPayload.viewerCount = viewerCount;
  videoPayload.liveStreamingDetails = thisItem.liveStreamingDetails;
  videoPayload.isDataLoaded = true;

  // Dispatch the action
  dispatch({ type: SELECT_VIDEO, payload: videoPayload });

};//END selectVideo


