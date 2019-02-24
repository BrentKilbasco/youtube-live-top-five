// Returns url to request channel details, for channel with given id
//

const rawURL: string =  'https://www.googleapis.com/youtube/v3/channels?'
                        + 'part=snippet&'
                        + 'key=' + process.env.REACT_APP_YOUTUBE_KEY + '&'
                        + 'id=';

const getURL = (channelId: string): string => {

  return rawURL + channelId;

};


export default {

  rawURL,
  getURL,

};

