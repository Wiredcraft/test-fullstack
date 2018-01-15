import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header'
import TalksList from './components/TalksList'
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
        <Header onAddClick={this.handleAddClick}/>
        <TalksList
          talks={this.state.talks}
          onUpvoteClick={this.handleUpvoteClick}
        />
      </div>
    );
  }
}

export default App;
