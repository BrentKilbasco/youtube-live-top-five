import IVideoID from './IVideoID';
import ISnippet from './ISnippet';

export default interface ISearchResult {
  
  kind: string;
  etag: string;
  id: IVideoID;
  snippet: ISnippet;

}//END ISearchResult
