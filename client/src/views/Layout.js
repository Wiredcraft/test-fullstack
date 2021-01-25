import React, { useEffect, useState, useCallback } from 'react'
import { bindActionCreators } from "redux"
// import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

// Import components
import Header from './components/Header'

// Import pages
import HomePage from './pages/Home';
import AuthPage from './pages/Auth';
import NewPollPage from './pages/New';

// Import actions
import { userActions } from '../core/users';
import { pollActions } from '../core/polls';

// class Layout extends Component {
const Layout = props => {
  
    const {
      authedUser,
      authUser,
      logoutUser,
      getPolls,
      postPoll,
      polls,
      loading
    } = props;
    
    useEffect(() => {
      getPolls()
    }, [getPolls])

    const authed = (!!authedUser ? !!authedUser.token : false);
    return (
      <div style={{backgroundColor: "#f6f6ef"}}>
        <Header logoutUser={logoutUser} />
        <Switch>
          <Route exact path='/' render={() => 
            <HomePage
              polls = {polls}
              loading = {loading}
            />}
          />
          <Route exact path='/new' render={() => 
            <NewPollPage 
              postPoll={postPoll}
              authed={authed} 
            />} 
          />
          <Route exact path='/login' render={() => <AuthPage
            authUser={authUser}
            logoutUser={logoutUser}/>}
          />
        </Switch>
      </div>
    )
  // }
}

const mapStateToProps = state => ({
  polls: state.polls.all.polls,
  loading: state.polls.all.loading,
  authedUser: state.users.authedUser.user
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    ...userActions,
    ...pollActions
  }, dispatch)

//  CONNECT
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
