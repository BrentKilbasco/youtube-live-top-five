import { SELECT_VIDEO } from '../actions/types';


export default function ( state = null, action ){

  switch (action.type) {

    case SELECT_VIDEO:
      return action.payload;

    default:
      return state;

  }// END switch

}// END 

