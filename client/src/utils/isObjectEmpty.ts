
export default (object: any): boolean => {

  for ( const key in object ) {
    if ( object.hasOwnProperty(key) )
      return false;
  }//END for

  return true;

}//END isEmpty
