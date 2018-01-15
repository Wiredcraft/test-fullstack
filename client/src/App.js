import React, { Component } from 'react';
import axios from 'axios';
import './assets/sass/App.css';

class App extends Component {
  state = {}

  componentWillMount = () => {
    this.getTalks();
  }

  handleAddClick = () => {
    this.addNewTalk()
  }

  getTalks = () => {
    axios.get('/api/talks')
      .then(response => {
        const talks = response.data.talks
        this.setState({talks})
      })
      .catch(error => {
        console.log(error);
      });
  }

  addNewTalk = () => {
    axios.post('/api', {
      id: 2,
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

  handleUpvoteClick = (id) => {
    console.log(id)
    this.upvoteTalk(id)
  }

  upvoteTalk = (id) => {
    axios.post('/api/upvote', {
      id: id
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
            <button onClick={this.handleUpvoteClick.bind(this, talk.id)}>Upvote</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
