const moment = require( 'moment' );

// parse youtube comments into a simplified object
//
export default (items) => {

  let retItems = [];

  for ( let i = 0; i < items.length; i++ ) {  
        
    const thisItem = items[i];

    if ( 'textMessageDetails' in thisItem.snippet && 'messageText' in thisItem.snippet.textMessageDetails ){

      retItems.push({
        id: thisItem.etag,
        displayName: thisItem.authorDetails.displayName,
        msgText: thisItem.snippet.textMessageDetails.messageText,
        profileImageUrl: thisItem.authorDetails.profileImageUrl,
        //publishedAt: thisItem.snippet.publishedAt,    // Use this for when using faker
        publishedAt: moment(thisItem.snippet.publishedAt, 'YYYY-MM-DDThh:mm:ss Z').format('h:mm:ss a'),  // Can be used when not using faker
      });
          
    }//END if
  }//END for

  return retItems;

};//END 
