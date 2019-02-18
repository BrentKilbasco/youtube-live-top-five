import React from 'react';

import './LongDescription.css';


const LongDescription = (props) => {
    
  return (

    <div className="description-detail">

      <div className="divider" />
      <br />

      <div className="channel-title-segment">
        <div className="channel-avatar">
          <img 
            className="ui circular image" 
            src={props.channelImageUrl} />
        </div>

        <div className="description-text">
          <div>
            {props.channelTitle}
          </div>
          <br />
          
          <div>
            <small>
              {props.description}
            </small>
          </div>
          <br />
        </div>
      </div>

    </div>

  );//END return

};//END LongDescription


export default LongDescription;
