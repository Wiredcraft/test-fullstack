import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

// Import components
import Header from './components/header'

// Import pages
import HomePage from './pages/Home';
import AuthPage from './pages/Auth';
import NewPollPage from './pages/New';

// Import actions
import { userActions } from '../core/users';
import { pollActions } from '../core/polls';

class Layout extends Component {
  
  componentDidMount = () => {
    this.props.getPolls();
  }

  render() {
    const {
      authedUser,
      logoutUser
    } = this.props;
    const authed = (!!authedUser ? !!authedUser.token : false);
    return (
      <div>
        <Header logoutUser={logoutUser} />
        <Switch>
          <Route exact path='/' render={() => 
            <HomePage 
              getPolls={this.props.getPolls}
              updatePollVote={this.props.updatePollVote}
              authed={authed} 
            />}
          />
          <Route exact path='/new' render={() => 
            <NewPollPage 
              postPoll={this.props.postPoll}
              authed={authed} 
            />} 
          />
          <Route exact path='/login' render={() => <AuthPage
            authUser={this.props.authUser}
            logoutUser={logoutUser}/>}
          />
        </Switch>
      </div>
    )
  }
}

Layout.propTypes = {
  authedUser: PropTypes.shape({
    cuid: PropTypes.string,
    name: PropTypes.string,
    polls: PropTypes.array,
    token: PropTypes.string
  }),
  authUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  getPolls: PropTypes.func.isRequired,
  updatePollVote: PropTypes.func.isRequired,
  postPoll: PropTypes.func.isRequired
};

//  CONNECT
export default connect(
  state => ({
    authedUser: state.users.authedUser.user
  }), {
    ...userActions,
    ...pollActions
  })(Layout);
