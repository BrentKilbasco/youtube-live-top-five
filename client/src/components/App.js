import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';



class App extends Component {


  // componentDidMount
  //
  componentDidMount() {

    this.props.fetchUser();

  }// END componentDidMount



  // render
  //
  render() {
    return (

      <div className="ui container">
        <BrowserRouter>
          <div>

            <Header />
            
            <Route exact path="/" component={Landing} />
            <Route exact path="/home" component={Dashboard} />                        

          </div>
        </BrowserRouter>
      </div>

    );// END return
  }// END render
 

}// END class App


export default connect(null, { 
  fetchUser,
})(App);
