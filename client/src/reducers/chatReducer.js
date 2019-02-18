import parseYouTubeComments from '../utils/parseYouTubeComments';
import { FETCH_CHAT_MSGS, FETCH_CHAT_MSGS_BEGIN } from '../actions/types';


const maxMessages = 800;
const defaultState = {

  items: [],
  nextPageToken: null,
  pollingIntervalMillis: null,

};


export default function ( state = defaultState, action ){

  switch (action.type) {

    case FETCH_CHAT_MSGS:
      return parseChatPayload( state, action.payload );

    case FETCH_CHAT_MSGS_BEGIN:
      return parseChatPayload( defaultState, action.payload );

    default:
      return state;

  }// END switch

}// END 



// parseChatPayload
//
function parseChatPayload(state, data){

  // Add the new msgs to the current list
  const newItems = parseYouTubeComments( data.items ); 
  let msgsToShow = Array.from( state.items ).concat( newItems );

  // Cap the message lists
  if ( msgsToShow.length >= maxMessages )
    msgsToShow.splice( 0, msgsToShow.length - maxMessages );

  const { nextPageToken, pollingIntervalMillis } = data;
  const retData = {
    items: msgsToShow,
    nextPageToken,
    pollingIntervalMillis,
  };

  return retData;

}//END parseMessages

