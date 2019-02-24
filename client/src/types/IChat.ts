import IChatItemFlattened from './IChatItemFlattened';

export default interface IChat {

  items: IChatItemFlattened[];
  nextPageToken: string;
  pollingIntervalMillis: string;

}//END IChat
 