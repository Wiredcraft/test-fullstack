import React from 'react'

class Buttons extends React.Component {
  render(){

    return (
      <div className="lt-votes-container">
        <div className="lt-votes-number">
        {/* to display votes to the user*/}
          <p>{this.props.votes}</p>
        </div>
          <div className="lt-buttons">
        {/*increment and decrement become a property of buttons onClick. This means when either up vote or down vote are pressed,  parent component (LightningTalk) triggers a function (defined as increment and decrement in LightningTalk) which sets the state of votes to increase/decrease */}
            <button onClick={this.props.increment}>Up Vote Button </button>
            <button onClick= {this.props.decrement}>Down Vote Button </button>
          </div>
      </div>

    )
  }
}

export default Buttons
