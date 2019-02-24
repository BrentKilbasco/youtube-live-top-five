import * as React from 'react';


class Landing extends React.Component<{}, {}> {


  // render
  //
  public render(): React.ReactNode {

    return (
      <div 
        className="container" 
        style={{ textAlign: 'center', marginTop:16 }}>
        
        <br />
        <br />
        <br />
  
        <h1>
          YouTubeLive
        </h1>
  
        <br />
        
        <h6>Watch it when it happens!</h6>
      </div>
    );//END return

  }//END render

};// END Landing


export default Landing;
