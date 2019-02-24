import * as express from 'express';
import { Request, Response } from 'express';
import lodash from 'lodash';

import { IUser } from '../types';

const passport = require( 'passport' );


module.exports = (app: express.Application) => {


  const authScopes: string[] = [
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
    (req: Request, res: Response) => {

      res.redirect( '/home' );

    },
  );


  // logout
  //
  app.get( '/api/logout', (req: Request, res: Response) => {

    req.logout();
    res.redirect( '/' );

  });


  // GET current user
  //
  app.get( '/api/current_user', (req: Request, res: Response) => {

    // Data to send back is either a user object or empty object
    const pickElems: string[] = ['_id', 'googleId', 'credits'];
    const resData: IUser | {} = lodash.pick( req.user, pickElems );
  
    res.send( resData );

  });

  
};//END exports
