import IVideoThumbnail from './IVideoThumbnail';

export default interface ISnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: IVideoThumbnail
  };
  channelTitle: string;
  liveBroadcastContent: string;
}//END ISnippet

