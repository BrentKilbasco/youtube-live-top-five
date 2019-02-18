import { combineReducers } from 'redux';
import authReducer from './authReducer';
import videosReducer from './videosReducer';
import selectedVideoReducer from './selectedVideoReducer';
import chatReducer from './chatReducer';


export default combineReducers({

  auth          : authReducer,
  videos        : videosReducer,
  selectedVideo : selectedVideoReducer,
  chat          : chatReducer,
  
});

