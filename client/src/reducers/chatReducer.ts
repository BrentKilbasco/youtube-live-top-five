import { FETCH_CHAT_MSGS, FETCH_CHAT_MSGS_BEGIN } from '../actions/types';
import { IChat, IChatItemFlattened } from '../types';
import { IFetchChatAction } from '../types/actions';


const maxMessages: number = 800;
const defaultState: IChat = {

  items: [],
  nextPageToken: '',
  pollingIntervalMillis: '',

};


export default function ( state: IChat = defaultState, action: IFetchChatAction ): IChat{

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
function parseChatPayload(state: IChat, payload: IChat ): IChat{

  // Add the new msgs to the current list
  const newItems: IChatItemFlattened[] = payload.items;
  const msgsToShow: IChatItemFlattened[] = Array.from( state.items ).concat( newItems );

  // Cap the message lists
  if ( msgsToShow.length >= maxMessages )
    msgsToShow.splice( 0, msgsToShow.length - maxMessages );

  const { nextPageToken, pollingIntervalMillis } = payload;
  const retData: IChat = {
    items: msgsToShow,
    nextPageToken,
    pollingIntervalMillis,
  };

  return retData;

}//END parseMessages

