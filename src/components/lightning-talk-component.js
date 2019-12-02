import React from "react"
import Buttons from './buttons.js';

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
          <div className="lt-text">
            <div className="lt-title"> {this.props.lightningTalk.title}</div>
            <div className="lt-description"> {this.props.lightningTalk.description}</div>
          </div>
        {/*increment= and decrement= (defined as a prop of Buttons in Buttons class) equals the increment and decrement function of this (LightningTalk) component. This means the state of votes changes onClick of up-vote/down-vote buttons*/}
          <Buttons incrementInLightning={this.incrementInLightning} decrementInLightning={this.decrementInLightning} votes={this.props.lightningTalk.votes}/>
        </div>
      )
    }
  }



export default LightningTalk;
