import React, { Component } from 'react'
import Header from './components/Header'
import TalksList from './components/TalksList'
import FormContainer from './components/FormContainer'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { fetchTalks, upvote, hideUpvoted } from './actions/actionCreators'
import { connect } from 'react-redux'
import './assets/sass/App.css'

const mapStateToProps = (state) => ({
    talks: state && state.talks.talks,
    upvoted: state && state.likes.upvoted
})

const mapDispatchToProps = (dispatch) => ({
    fetchTalks: () => dispatch(fetchTalks()),
    upvote: (allTalks, id) => dispatch(upvote(allTalks, id)),
    hideUpvoted: (id, upvoted) => dispatch(hideUpvoted(id, upvoted))
})

class App extends Component {

  componentWillMount = () => {
    this.props.fetchTalks()
  }

  handleUpvoteClick = (id) => {
    this.props.upvote(this.props.talks, id)
    this.props.hideUpvoted(this.props.upvoted, id)
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
                upvoted={this.props.upvoted}
              />
            }/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
