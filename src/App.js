import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './redux/reducers'
import Talks from './pages/Talks'
import './App.css'

let store = createStore(
  reducer,
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
