import IVideoID from './IVideoID';
import ISnippet from './ISnippet';
import IStreamingDetails from './IStreamingDetails';

export default interface ISelectedVideo{

  isDataLoaded: boolean;
  ownerChannelImageUrl: string;
  liveChatId: string;
  viewerCount: string;
  
  kind: string;
  etag: string;
  id: IVideoID;
  snippet: ISnippet;

  liveStreamingDetails: IStreamingDetails;

}//END ISelectedVideo
