const passport = require( 'passport' );
const GoogleStrategy  = require( 'passport-google-oauth20' ).Strategy;
const mongoose = require( 'mongoose' );
const jwt = require( 'jsonwebtoken' );
const refresh = require( 'passport-oauth2-refresh' );

const keys = require( '../config/keys' ); 


const User = mongoose.model( 'users' );



// serializeUser
//
passport.serializeUser( (user, done) => {

  done( null, user.id );  // MongoDB profile/user ID

});//END serializeUser



// deserializeUser
//
passport.deserializeUser( (id, done) => {

  // Find user by ID and return
  User.findById( id )
    .then( (user) => {
      
      done( null, user );

    });

});//END deserializeUser


// Create the google passport strategy
const googleStrategy = new GoogleStrategy({

  clientID        : keys.googleClientID,
  clientSecret    : keys.googleClientSecret, 
  callbackURL     : '/auth/google/callback',
  proxy           : true,

}, async (accessToken, refreshToken, profile, done) => {

  // Search for existing user with googleId
  const existingUser = await User.findOne({ googleId: profile.id });

  // Encrypt the tokens into a jwt 'package', before
  //  storing them in the DB
  const tokenPackagePayload = jwt.sign( { 
    id: profile.id,
    accTok: accessToken, 
    refTok: refreshToken, 
    dateIssued: Date.now(),
  }, keys.jwtPrivateKey );

  // If an existing user, update their tokens
  if ( existingUser ) {

    existingUser.tpp = tokenPackagePayload;
    await existingUser.save();

    done( null, existingUser ); // 1st arg is error msg, 2nd arg is return value

  } else {

    // Create a new user
    //
    const user = await new User({
      googleId: profile.id, 
      tpp: tokenPackagePayload,     
    }).save();
    
    done( null, user );

  }//END if/else

}); // END new GoogleStrategy 


passport.use( googleStrategy );
refresh.use( googleStrategy );

