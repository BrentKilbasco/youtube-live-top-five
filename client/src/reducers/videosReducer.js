import { FETCH_TOP_LIVE_STREAMS } from '../actions/types';


export default function ( state = [], action ){

  switch (action.type) {

    case FETCH_TOP_LIVE_STREAMS:
    
      return action.payload;

    default:
      return state;

  }// END switch

}// END 

