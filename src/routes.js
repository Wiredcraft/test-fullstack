import React, { Component } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import List from './pages/List'
import Header from './pages/Header'
import NewLightingTalk from './pages/NewLightingTalkForm'


class App extends Component {
  render () {
    return (
      <div className='App'>
        <Router>
          <span>
            <Route path='/' component={Header}/>
            <Route path='/list' component={List} />
            <Route path='/new' component={NewLightingTalk} />
          </span>
        </Router>
      </div>
    )
  }
}

export default App
