import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, compose } from 'redux'
import reducers from './reducers'
import App from './routes'
import './assets/css/font-awesome.min.css'
const store = createStore(
  reducers,
  {},
  compose(
    window.devToolsExtension && window.devToolsExtension()
  )
)

const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))
