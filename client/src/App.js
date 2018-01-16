import React, { Component } from 'react'
import axios from 'axios'
import Header from './components/Header'
import TalksList from './components/TalksList'
import FormContainer from './components/FormContainer'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { fetchTalks } from './actions/actionCreators'
import { connect } from 'react-redux'
import './assets/sass/App.css'

const mapStateToProps = (state) => ({
    talks: state && state.talks
})

const mapDispatchToProps = (dispatch) => ({
    fetchTalks: () => dispatch(fetchTalks())
})

class App extends Component {
  state = {}

  componentWillMount = () => {
    this.props.fetchTalks()
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
      <BrowserRouter>
        <div className="c-App">
          <Header/>
          <Switch>
            <Route path="/add" component={FormContainer}/>
            <Route path="/" render={() =>
              <TalksList
                talks={this.props.talks}
                onUpvoteClick={this.handleUpvoteClick}
              />
            }/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
