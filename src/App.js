import React, {Component} from 'react'
import Talks from './Talks'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
          <header>
            <h1>Hacker News</h1>
          </header>
          <Talks />
      </div>
    )
  }
}

export default App
