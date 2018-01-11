import 'isomorphic-fetch'
import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import Talks from './pages/Talks'
import talks from './redux/talks'
import talkBox from './redux/talkBox'
import './App.css'

let store = createStore(
  combineReducers({
    talks,
    talkBox,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunkMiddleware),
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
            <header>
              <h1>Hacker News</h1>
            </header>
            <Talks />
        </div>
      </Provider>
    )
  }
}

export default App
