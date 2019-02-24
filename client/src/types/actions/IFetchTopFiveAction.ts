import { ISearchResult } from '../';
import { FETCH_TOP_LIVE_STREAMS } from '../../actions/types';


export default interface IFetchTopFiveAction {

  type: FETCH_TOP_LIVE_STREAMS;
  payload: ISearchResult[];

};
