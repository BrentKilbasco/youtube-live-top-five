import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';



// Prop type declaration
//
export interface IProps {
 fetchUser: () => Promise<void>; 
};


// Class declaration
//
class App extends React.Component<IProps, {}> {



  // componentDidMount
  //
  public componentDidMount() {

    this.props.fetchUser();

  }// END componentDidMount



  // render
  //
  public render() {
    return (

      <div className="ui container">
        <BrowserRouter>
          <div>

            <Header />
            
            <Route exact={true} path="/" component={Landing} />
            <Route exact={true} path="/home" component={Dashboard} />                        

          </div>
        </BrowserRouter>
      </div>

    );// END return
  }// END render
 

}// END class App


export default connect(null, { 
  fetchUser,
})(App);
