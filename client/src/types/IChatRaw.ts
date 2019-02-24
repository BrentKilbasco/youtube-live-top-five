import IChatItemRaw from './IChatItemRaw';

export default interface IChatRaw {

  items: IChatItemRaw[];
  nextPageToken: string;
  pollingIntervalMillis: string;

}//END IChatRaw
 