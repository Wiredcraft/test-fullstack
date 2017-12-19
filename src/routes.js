import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import List from './pages/List'
import Header from './pages/Header'
import NewLightingTalk from './pages/NewLightingTalkForm'


class App extends Component {
  render () {
    return (
      <div className='App'>
        <Route path='/' component={Header} />
        <Route path='/list' component={List} />
        <Route path='/new' component={NewLightingTalk} />
      </div>
    )
  }
}

export default App
