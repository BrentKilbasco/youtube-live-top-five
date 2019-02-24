import IAuth from './IAuth';
import ISearchResult from './ISearchResult';
import ISelectedVideo from './ISelectedVideo';
import IChat from './IChat';

export default interface IStoreState {
  auth: IAuth;
  videos: ISearchResult[];
  selectedVideo: ISelectedVideo;
  chat: IChat;
};

