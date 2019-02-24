import { Model, model } from 'mongoose';
import passport from 'passport';
import jwt = require( 'jsonwebtoken' );

import { IUserModel } from '../models/User';

const GoogleStrategy  = require( 'passport-google-oauth20' ).Strategy;
const refresh = require( 'passport-oauth2-refresh' );
const keys = require( '../config/keys' ); 





const User: Model<IUserModel> = model<IUserModel>( 'users' );



// serializeUser
//
passport.serializeUser<IUserModel, string>( (user, done) => {

  done( undefined, user.id );  // MongoDB profile/user ID

});//END serializeUser



// deserializeUser
//
passport.deserializeUser<IUserModel | null, string>( (id, done) => {

  User.findById(id, (err: any, user: IUserModel) => {
    done(err, user);
  });

});//END deserializeUser


// Create the google passport strategy
const googleStrategy = new GoogleStrategy({

  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret, 
  callbackURL: '/auth/google/callback',
  proxy: true,

}, async (accessToken: string, refreshToken: string, googleProfile: any, done: any) => {

  // Search for existing user with googleId
  const existingUser: IUserModel | null = await User.findOne({ googleId: googleProfile.id });

  // Encrypt the tokens into a jwt 'package', before
  //  storing them in the DB
  const tokenPackagePayload: string = jwt.sign( { 
    id: googleProfile.id,
    accTok: accessToken, 
    refTok: refreshToken, 
    dateIssued: Date.now(),
  }, keys.jwtPrivateKey );

  // If an existing user, update their tokens
  if ( existingUser !== null ) {

    existingUser.tpp = tokenPackagePayload;
    await existingUser.save();

    done( null, existingUser ); // 1st arg is error msg, 2nd arg is return value

  } else {

    // Create a new user
    //
    const user: IUserModel = await new User({
      googleId: googleProfile.id, 
      tpp: tokenPackagePayload,     
    }).save();
    
    done( null, user );

  }//END if/else

}); // END new GoogleStrategy 


passport.use( googleStrategy );
refresh.use( googleStrategy );

