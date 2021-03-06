// Returns url to request the live streaming details for video with given id
//

const rawURL: string =  'https://www.googleapis.com/youtube/v3/videos?'
                        + 'part=liveStreamingDetails&'
                        + 'key=' + process.env.REACT_APP_YOUTUBE_KEY + '&'
                        + 'id=';                            


const getURL = (videoId: string): string => {

  return rawURL + videoId;

};


export default {

  rawURL,
  getURL,

};
