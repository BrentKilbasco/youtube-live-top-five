import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';



class Header extends Component {


  renderContent() {

    let { auth } = this.props;

    // Check to make sure we have a user logged in
    if ( !('_id' in auth) )
      auth = false;

    switch ( auth ){

      case null:
        return <div />;

      case false:
        return <li><a href="/auth/google">Login With Google</a></li>;

      default:

        return [
          <li key="3">
            <div>
              <a href="/api/logout">Logout</a>
            </div>
          </li>,
        ];

    }// END switch 

  }// END renderContent



  render() { 
    return (

      <nav className="grey">
        <div className="nav-wrapper">

          <Link 
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo"
            style={{ paddingLeft:10 }}
          >
            <i className="youtube icon" />
            YouTubeLive
          </Link>   
          
          <ul className="right">        
            {this.renderContent()}
          </ul>

        </div>
      </nav>

    );// END return
  }// END render


}//END class Header


function mapStateToProps({ auth }) {

  return { auth };

}// END mapStateToProps



export default connect(mapStateToProps)(Header);
