import React from 'react';
import './form.css';

// the initial state of title and description are an empty string since the form is empty and the inputted values must be a string

class Form extends React.Component {
   constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this)
      this.state = {
        title: '',
        description: ''
      }
   }
// on submit, time is logged (new Date) and state of title and description is changed
   onSubmit= (e) => {
    e.preventDefault()

    const titleDescription = this.state
    // call onSubmit in LightningTalk so that new talk is added from form

    this.props.postInApp(titleDescription)
   }

// the values of the title and description (this.title) are set to whatever is typed into the input forms (setState... event.target.value) as it is being typed
  render() {
    return (
      <form className="form-container">
        <label>
        <p className="form-title">Title:</p>
          <input className="input-title"
          placeholder="enter a title"
          value={this.state.title}
          onChange={e => this.setState({title: e.target.value})} />
        </label>
        <br />
        <label>
        <p className="form-description">Description:</p>
          <input className="input-description"
          placeholder="enter a description"
          value={this.state.description}
          onChange={e => this.setState({description: e.target.value})} />
        {/*when the button is clicked, call the onSubmit function above. E (event) is passed into onSubmit function (above)*/}
        </label>
        <br />
        <button onClick={e => this.onSubmit(e)}>Submit Talk</button>
      </form>
      );
  }
}

export default Form;
