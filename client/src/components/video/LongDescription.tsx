import * as React from 'react';

import '../../css/video_components/LongDescription.css';


// Prop type declaration
//
export interface IProps {
  channelImageUrl: string;
  channelTitle: string;
  description: string;
};


// Class declaration
//
class LongDescription extends React.PureComponent<IProps, {}> {
    
  public render(): React.ReactNode {

    return (
      <div className="description-detail">

        <div className="divider" />
        <br />

        <div className="channel-title-segment">
          <div className="channel-avatar">
            <img 
              className="ui circular image" 
              src={this.props.channelImageUrl} />
          </div>

          <div className="description-text">
            <div>
              {this.props.channelTitle}
            </div>
            <br />
            
            <div>
              <small>
                {this.props.description}
              </small>
            </div>
            <br />
          </div>
        </div>

      </div>
    );//END return

  }//END render

};//END LongDescription


export default LongDescription;
