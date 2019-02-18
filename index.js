const express = require( 'express' );
const mongoose = require( 'mongoose' );
const cookieSession = require( 'cookie-session' );
const passport = require( 'passport' );
const bodyParser = require( 'body-parser' );

const keys = require( './config/keys' );

require( './startup/logging' );
require( './models/User' );
require( './services/passport' );



mongoose.connect( keys.mongoURI, { useNewUrlParser: true } );


const app = express(); 


app.use( bodyParser.json() );

// Set cookie session max age to 30 days (in milliseconds)
app.use( cookieSession({ 

  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey],

}));


app.use( passport.initialize() );
app.use( passport.session() );


// Set routes
require( './routes/authRoutes' )( app );



if ( process.env.NODE_ENV === 'production' ){

  app.use( express.static('client/build') );

  // Express will serve up the index.html file if it 
  //  doesn't recognize the route
  const path = require( 'path' );
  app.get( '*', (req, res) => {
    res.sendFile( path.resolve(__dirname, 'client', 'build', 'index.html') );

  });

}// END if


// Start listening on port provided by Heroku, unless
//  undefined, then listen on 5000.
const PORT = process.env.PORT || 5000; 
app.listen( PORT );

