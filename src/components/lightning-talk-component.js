import React from "react"
import Buttons from './buttons.js';

// votes initial state is set to 0 as all lightning talks will start with zero votes. Title and description also set to an empty string until API sets state
class LightningTalk extends React.Component {
   constructor(props){
    super(props);
    this.state = {
      votes: 0
    }
  }

// Need to change this so that the increment and decrement change the state of votes in App (super?). I assume that because it is a nested array it no longer works
   increment = (e) => {
    this.setState({
      lightningTalks: this.state.lightningTalk.votes + 1
    })
  }

   decrement = (e) => {
    this.setState({
      lightningTalks: this.state.lightningTalk.votes - 1
    })
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
          <Buttons increment={this.increment} decrement={this.decrement} votes={this.props.lightningTalk.votes}/>
        </div>
      )
    }
  }



export default LightningTalk;
