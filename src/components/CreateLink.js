import React, { Component } from 'react';

class CreateLink extends Component {
  state = {
    description: '',
    url: ''
  };

  //Add the input values to the state.
  handleChange = e => {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  //TODO: Implement the submit button
  handleSubmit = e => {
    console.log('Submitted');
  };

  render() {
    const { description, url } = this.state;

    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            placeholder="A description for the talk"
            className="mb2"
            type="text"
            value={description}
            onChange={this.handleChange}
          />
          <input
            placeholder="The URL for the Talk"
            className="mb2"
            type="text"
            value={url}
            onChange={this.handleChange}
          />
        </div>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export default CreateLink;
