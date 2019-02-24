import { ILogObject } from '../types';


// Set uncaught exception handler
process.on( 'uncaughtException', (ex: Error) => {

  const logObject: ILogObject = {
    level: 'error',
    message: ex.message,
    stack: ex.stack,
  };

  console.log( 'UNCAUGHT EXCEPTION: ', logObject );
  process.exit( 1 );

});


// Set unhandled promise rejection
process.on( 'unhandledRejection', (ex) => {
  throw ex;

});
