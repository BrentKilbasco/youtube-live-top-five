import { FETCH_USER } from '../actions/types';
import { IAuth } from '../types';
import { IFetchUserAction } from '../types/actions';



const initialState: IAuth = {
  _id: '',
  googleId: '',
  credits: 0,
};


export default function (state: IAuth = initialState, action: IFetchUserAction): IAuth {

  switch ( action.type ) {

    case FETCH_USER:
      return action.payload || state;

    default:
      return state;

  }// END switch

}// END export function
