import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router'
import { store } from './app/createStore'
import { App } from './app/App'

const history = createBrowserHistory()

// tslint:disable
ReactDOM.render(
  <Provider store={store as any}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  , document.getElementById('app')
)
