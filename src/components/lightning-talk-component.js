import React from "react"
import Buttons from './buttons.js';

// votes initial state is set to 0 as all lightning talks will start with zero votes
class LightningTalk extends React.Component {
    constructor(props){
    super(props);
    this.state = {votes: 0}
  }

// increment and decrement are called when onClick happens on either the Up Vote or Down Vote buttons (in child class Buttons)
   increment = (e) => {
    this.setState({
      votes : this.state.votes + 1
    })
  }

   decrement = (e) => {
    this.setState({
      votes : this.state.votes - 1
    })
  }

  // when the page renders (loads), pass title and description to parent function (App) as props
  render () {
    const title = this.props.lightningTalk.title
    const description = this.props.lightningTalk.description
    return (
        <div className="lightning-talk-item">
          <div className="lt-text">
            <div className="lt-title"> {title}</div>
            <div className="lt-description"> {description}</div>
          </div>
        {/*increment= and decrement= (defined as a prop of Buttons in Buttons class) equals the increment and decrement function of this (LightningTalk) component. This means the state of votes changes onClick of up-vote/down-vote buttons*/}
          <Buttons increment={this.increment} decrement={this.decrement} votes={this.state.votes}/>
        </div>
      )
    }
  }



export default LightningTalk;
