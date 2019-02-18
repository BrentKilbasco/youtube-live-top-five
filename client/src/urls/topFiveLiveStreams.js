// Returns url to request the current top 5 live streams on youtube
//

const rawURL =  'https://www.googleapis.com/youtube/v3/search?'
                + 'part=snippet&'
                + 'eventType=live&'       
                + 'type=video&'           
                + 'order=viewCount&'       
                + 'videoEmbeddable=true&'   
                + 'key=' + process.env.REACT_APP_YOUTUBE_KEY;


const getURL = () => {

  return rawURL;

};


export default {

  rawURL,
  getURL,

};
