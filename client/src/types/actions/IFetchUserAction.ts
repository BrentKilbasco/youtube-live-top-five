import { IAuth } from '..';
import { FETCH_USER } from '../../actions/types';


export default interface IFetchUserAction {

  type: FETCH_USER;
  payload: IAuth;

};
