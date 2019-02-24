import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


import { IStoreState, IAuth } from '../types/index';


// Prop type declaration
//
export interface IProps {
  auth: IAuth;
};


// Class declaration
class Header extends React.Component<IProps, {}> {


  // render
  //
  public render(): React.ReactNode { 
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


  // renderContent
  //
  private renderContent(): JSX.Element {

    const { auth } = this.props;
    
    // Check to make sure we have a user logged in
    const isLoggedIn = auth && auth._id !== '';

    switch ( isLoggedIn ){

      case true:
        return (
          <li key="3">
            <div>
              <a href="/api/logout">Logout</a>
            </div>
          </li>
        );        

      case false:
        return <li><a href="/auth/google">Login With Google</a></li>;

      default:
        return <li><div /></li>;

    }// END switch 

  }// END renderContent
  

}//END class Header



function mapStateToProps({ auth }: IStoreState): IProps {

  return { auth };

}// END mapStateToProps

export default connect(mapStateToProps)(Header);
