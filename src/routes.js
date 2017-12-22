import React, { Component } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import List from './pages/List'
import Header from './pages/Header'
import NewLightingTalk from './pages/NewLightingTalkForm'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Router>
          <span>
            <Route path='/*' component={Header}/>
            <Switch>
              <Route exact path='/' component={List}/>
              <Route path='/new' component={NewLightingTalk} />
            </Switch>
          </span>
        </Router>
      </div>
    )
  }
}

export default App
