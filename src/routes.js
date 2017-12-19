import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import Test from './pages/Test'


class App extends Component {
  render () {
    return (
      <div className='App'>
        <Route path='/' component={Test} />
      </div>
    )
  }
}

export default App
