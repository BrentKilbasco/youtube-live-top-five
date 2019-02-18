// Returns url to request the live chat feed
//

const part = 'snippet,authorDetails';
const rawURL =  `https://www.googleapis.com/youtube/v3/liveChat/messages?part=${part}&`;


const getURL = (liveChatId, nextPageToken = null) => {

  let retvalue = rawURL + `liveChatId=${liveChatId}&key=${process.env.REACT_APP_YOUTUBE_KEY}`;

  if ( nextPageToken !== null )
    retvalue += `&pageToken=${nextPageToken}`;

  return retvalue;

};//END getURL


export default {

  rawURL,
  getURL,

};

