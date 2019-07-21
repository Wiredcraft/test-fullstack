import React, { Component } from 'react';

export default class CreateLink extends Component {
    state = {
        description: "",
        url: ""
    }


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
            onChange={}
            />
            <input 
            placeholder="The URL for the Talk"
            className="mb2"
            type="text"
            value={url}
            onChange={}
            />
        </div>
        <button onClick={} >Submit</button>

    </div>);
  }
}
