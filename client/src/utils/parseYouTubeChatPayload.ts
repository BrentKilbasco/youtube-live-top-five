import parseYouTubeComments from './parseYouTubeComments';

import { IChat, IChatItemFlattened, IChatRaw } from '../types';


export default (chatPayload: IChatRaw): IChat => {

  const flattenedItems: IChatItemFlattened[] = parseYouTubeComments( chatPayload.items ); 
  const flattenedPayload: IChat = {

    items: flattenedItems,
    nextPageToken: chatPayload.nextPageToken,
    pollingIntervalMillis: chatPayload.pollingIntervalMillis,

  };

  return flattenedPayload;

};//END 

