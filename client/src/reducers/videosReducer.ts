import { FETCH_TOP_LIVE_STREAMS } from '../actions/types';
import { IFetchTopFiveAction } from '../types/actions';
import { ISearchResult } from '../types';


const initialState: ISearchResult[] = [];

export default function ( state: ISearchResult[] = initialState, action: IFetchTopFiveAction ): ISearchResult[]{

  switch (action.type) {

    case FETCH_TOP_LIVE_STREAMS:
    
      return action.payload;

    default:
      return state;

  }// END switch

}// END 

