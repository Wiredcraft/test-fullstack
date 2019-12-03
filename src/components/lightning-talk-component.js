import React from "react"
import Buttons from './buttons.js';
import './lightning-talk-component.css';

// votes initial state is set to 0 as all lightning talks will start with zero votes. Title and description also set to an empty string until API sets state
class LightningTalk extends React.Component {

// send the id of the lightningTalk selected to the function called in App
   incrementInLightning = (e) => {
    const targetId = this.props.lightningTalk.id
    this.props.incrementInApp(targetId)
  }

   decrementInLightning = (e) => {
     const targetId = this.props.lightningTalk.id
     this.props.decrementInApp(targetId)
  }

  // when the page renders (loads), pass title and description to parent function (App) as props
  render () {
    return (
        <div className="lightning-talk-item">
        {/* to display votes to the user*/}
          <p className="lt-votes-number">{this.props.lightningTalk.votes}</p>
          <div className="lt-text">
            <h4 className="lt-title"> {this.props.lightningTalk.title}</h4>
            <p className="lt-description"> {this.props.lightningTalk.description}</p>
          </div>
        {/*increment= and decrement= (defined as a prop of Buttons in Buttons class) equals the increment and decrement function of this (LightningTalk) component. This means the state of votes changes onClick of up-vote/down-vote buttons*/}
          <Buttons incrementInLightning={this.incrementInLightning} decrementInLightning={this.decrementInLightning}/>
        </div>
      )
    }
  }



export default LightningTalk;
