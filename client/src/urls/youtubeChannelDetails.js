// Returns url to request channel details, for channel with given id
//

const rawURL =  'https://www.googleapis.com/youtube/v3/channels?'
                + 'part=snippet&'
                + 'key=' + process.env.REACT_APP_YOUTUBE_KEY + '&'
                + 'id=';

const getURL = (channelId) => {

  return rawURL + channelId;

};


export default {

  rawURL,
  getURL,

};





