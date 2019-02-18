
// Check the current environment
if ( process.env.NODE_ENV === 'production' ){

  // We are in production
  module.exports = require( './prod' );
  
} else {

  // We are in development
  module.exports = require( './dev' );

}//END if/else


