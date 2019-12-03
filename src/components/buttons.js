import React from 'react'
import '../components/buttons.css'

class Buttons extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        buttonUpDisabled: false,
        buttonDownDisabled: false
      }
   }
  // disables buttons after being clicked as disabled=state of corresponding button in Buttons component. This is changed to true when button is clicked
   increment = (e) => {
    // uncomment below so that users can only increase vote once
    // this.setState({buttonUpDisabled: true})
    const incrementCall = this.props.increment
    this.props.incrementInLightning(incrementCall)
   }

    decrement = (e) => {
    // uncomment below so that users can only decrease vote once
    // this.setState({buttonDownDisabled: true})
    const decrementCall = this.props.decrement
    this.props.decrementInLightning(decrementCall)
   }

  render(){

    return (
      <div className="lt-votes-container">
          <div className="lt-buttons">
        {/*increment and decrement become a property of buttons onClick. This means when either up vote or down vote are pressed,  parent component (LightningTalk) triggers a function (defined as increment and decrement in LightningTalk) which sets the state of votes to increase/decrease. Buttons also disabled when clicked */}
            <button className="button-up" disabled={this.state.buttonUpDisabled} onClick={this.increment}></button>
            <button className="button-down" disabled={this.state.buttonDownDisabled} onClick={this.decrement}></button>
          </div>
      </div>

    )
  }
}

export default Buttons
