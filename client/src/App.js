import React, { Component } from 'react';
import axios from 'axios';
import './assets/sass/App.css';

class App extends Component {
  state = {}

  componentWillMount = () => {
    axios.get('/api/message')
      .then(response => {
        const message = response.data.message
        this.setState({message})
      })
      .catch(error => {
        console.log(error);
      });
  }
    
  render() {
    return (
      <div className="c-App">
        <h1>Hacker Talks</h1>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default App;
