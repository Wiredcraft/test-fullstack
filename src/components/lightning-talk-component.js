import React from "react"
import Buttons from './buttons.js';

// votes initial state is set to 0 as all lightning talks will start with zero votes. Title and description also set to an empty string until API sets state
class LightningTalk extends React.Component {
    constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      votes: 0
    }
  }

componentDidMount = () => {
  fetch("http://localhost:3000/talks.json")
  .then(response => response.json())
  .then((data) => {
    data.forEach((talk) => {
      this.setState((state) => {
        return {
          title: talk.title,
          description: talk.description,
          votes: talk.votes
        };
      });
    });
  });
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
    return (
        <div className="lightning-talk-item">
          <div className="lt-text">
            <div className="lt-title"> {this.state.title}</div>
            <div className="lt-description"> {this.state.description}</div>
          </div>
        {/*increment= and decrement= (defined as a prop of Buttons in Buttons class) equals the increment and decrement function of this (LightningTalk) component. This means the state of votes changes onClick of up-vote/down-vote buttons*/}
          <Buttons increment={this.increment} decrement={this.decrement} votes={this.state.votes}/>
        </div>
      )
    }
  }



export default LightningTalk;
