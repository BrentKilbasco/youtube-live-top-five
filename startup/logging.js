
// Set uncaught exception handler
process.on( 'uncaughtException', (ex) => {

  const logObject = {
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

