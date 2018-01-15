import React, { Component } from 'react';
import axios from 'axios';
import './assets/sass/App.css';

class App extends Component {
  state = {}

  componentWillMount = () => {
    axios.get('/api/talks')
      .then(response => {
        const talks = response.data.talks
        this.setState({talks})
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleAddClick = () => {
    this.addNewTalk()
  }

  addNewTalk = () => {
    axios.post('/api', {
      title: 'What you do in tech that people forget is needed',
      desc: 'Worth checking out',
      user: 'nelson_wu'
    })
      .then(response => {
        console.log('response', response)
      })
      .catch(error => {
        console.log(error);
      });
  }
    
  render() {
    return (
      <div className="c-App">
        <h1>Hacker Talks</h1>
        <button onClick={this.handleAddClick}>add talk</button>
        {this.state.talks && this.state.talks.map((talk, i) =>
          <div key={i}>
            <p>{talk.title}</p>
            <p>{talk.desc}</p>
            <p>{talk.user}</p>
            <p>{talk.rating}</p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
