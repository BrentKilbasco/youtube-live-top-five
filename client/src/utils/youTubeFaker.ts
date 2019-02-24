import * as faker from 'faker';
import * as moment from 'moment';

import { IChatRaw, IChatItemRaw } from '../types';

// getLiveComments
//
const getLiveComments = (amount: number): IChatItemRaw[] => {

  const retvalue: IChatItemRaw[] = [];

  for ( let i = 0; i < amount; i++ ){

    const newEntry: IChatItemRaw = {
      etag: faker.random.uuid(),
      authorDetails: {
        displayName: faker.name.findName(),
        profileImageUrl: faker.internet.avatar(),
      },
      snippet: {
        publishedAt: moment(faker.date.recent(), 'YYYY-MM-DDThh:mm:ss Z').format('h:mm:ss a'),
        textMessageDetails: {
          messageText: faker.lorem.sentences(),
        },
      },        
    };

    retvalue.push( newEntry );

  }//END for

  return retvalue;

};//END getFakeComments


// getLiveChatResponse
//
const getLiveChatResponse = (): {data: IChatRaw} => {

  const newListChunk: IChatItemRaw[] = getLiveComments( 30 );
  const res: {data: IChatRaw} = {
    data: {
      items: newListChunk,
      nextPageToken: faker.random.uuid(),
      pollingIntervalMillis: (faker.random.number(2000) + 8000).toString(),
    },
  };

  return res;

};//END getFakeChatResponse


  

export default {
  getFakeComments: getLiveComments,
  getLiveChatResponse,
};
