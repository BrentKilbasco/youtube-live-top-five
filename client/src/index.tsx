import 'materialize-css/dist/css/materialize.min.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';

import * as dotenv from 'dotenv';
import App from './components/App';
import reducers from './reducers';



import './css/index.css';


// Read our environment files
dotenv.config();


const store = createStore( reducers, {}, applyMiddleware(reduxThunk) );

ReactDOM.render( 
  <Provider store={store}>
    <App />
  </Provider>, 
  document.querySelector( '#root' ), 
);

