const passport = require( 'passport' );
const lodash = require( 'lodash' );

module.exports = (app) => {


  const authScopes = [
    'profile', 
    'email',
    // 'https://www.googleapis.com/auth/youtube', 
    // 'https://www.googleapis.com/auth/youtube.readonly', 
    // 'https://www.googleapis.com/auth/youtube.force-ssl',
  ];


  // GET authentication
  //
  app.get( '/auth/google', passport.authenticate('google', {

    authType: 'rerequest',
    accessType: 'offline',
    scope: authScopes,

  }));


  // auth callback endpoint
  //
  app.get( 
    '/auth/google/callback', 
    passport.authenticate('google'),
    (req, res) => {

      res.redirect( '/home' );

    },
  );


  // logout
  //
  app.get( '/api/logout', (req, res) => {

    req.logout();
    res.redirect( '/' );

  });


  // GET current user
  //
  app.get( '/api/current_user', (req, res) => {

    const userDataForClient = lodash.pick( req.user, ['_id', 'googleId', 'credits'] );
    res.send( userDataForClient );

  });

  
};//END exports
