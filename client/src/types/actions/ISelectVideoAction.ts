import { ISelectedVideo } from '../';
import { SELECT_VIDEO } from '../../actions/types';


export default interface ISelectVideoAction {

  type: SELECT_VIDEO;
  payload: ISelectedVideo;

};
