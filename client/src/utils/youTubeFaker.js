import faker from 'faker';
import moment from 'moment';


// getLiveComments
//
const getLiveComments = (amount) => {

  let retvalue = [];

  for ( let i = 0; i < amount; i++ ){

    const newEntry = {
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
const getLiveChatResponse = () => {

  const newListChunk = getLiveComments( 30 );
  const res = {
    data: {
      items: newListChunk,
      nextPageToken: faker.random.uuid(),
      pollingIntervalMillis: faker.random.number(2000) + 8000,
    },
  };

  return res;

};//END getFakeChatResponse


  

export default {
  getFakeComments: getLiveComments,
  getLiveChatResponse,
};
