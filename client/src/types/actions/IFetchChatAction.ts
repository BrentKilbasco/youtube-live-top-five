import { IChat } from '..';
import { FETCH_CHAT_MSGS, FETCH_CHAT_MSGS_BEGIN } from '../../actions/types';


export default interface IFetchChatAction {

  type: FETCH_CHAT_MSGS | FETCH_CHAT_MSGS_BEGIN;
  payload: IChat;

};
