import * as moment from 'moment' ;

import { IChatItemFlattened, IChatItemRaw } from '../types';



// parse youtube comments into a simplified object
//
export default (items: IChatItemRaw[]): IChatItemFlattened[] => {

  const retItems: IChatItemFlattened[] = [];

  for ( const item of items ){

    if ( 'textMessageDetails' in item.snippet && 'messageText' in item.snippet.textMessageDetails ){

      retItems.push({
        id: item.etag,
        displayName: item.authorDetails.displayName,
        msgText: item.snippet.textMessageDetails.messageText,
        profileImageUrl: item.authorDetails.profileImageUrl,
        //publishedAt: thisItem.snippet.publishedAt,    // Use this for when using faker
        publishedAt: moment(item.snippet.publishedAt, 'YYYY-MM-DDThh:mm:ss Z').format('h:mm:ss a'),  // Can be used when not using faker
      });
          
    }//END if    

  }//END for-of









  return retItems;

};//END 
