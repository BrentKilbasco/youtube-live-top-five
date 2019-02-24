import { ISelectedVideo } from '../types';
import { SELECT_VIDEO } from '../actions/types';
import { ISelectVideoAction } from '../types/actions';



const initialState: ISelectedVideo = {
  
  isDataLoaded: false,
  ownerChannelImageUrl: '',
  liveChatId: '',
  viewerCount: '',
  
  kind: '',
  etag: '',
  id: {
    kind: '',
    videoId: '',
  },
  snippet: {  
    publishedAt: '',
    channelId: '',
    title: 'Main Title 2',
    description: 'Main Description 2',
    thumbnails: {
      default: {
        url: '',
        width: 0,
        height: 0,
      },
    },
    channelTitle: 'Channel Title 2',
    liveBroadcastContent: '',
  },

  liveStreamingDetails: {
    actualStartTime: '',
    actualEndTime: '',
    scheduledStartTime: '',
    scheduledEndTime: '',
    concurrentViewers: 0,
    activeLiveChatId: '',
  },

};


export default function ( state: ISelectedVideo = initialState, action: ISelectVideoAction ): ISelectedVideo {

  switch (action.type) {

    case SELECT_VIDEO:
      return action.payload;

    default:
      return state;

  }// END switch

}// END 

