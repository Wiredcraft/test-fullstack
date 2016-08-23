import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, hashHistory } from 'react-router';
import configureStore from './store/configureStore';

import routes from './routes';

import './scss/main.scss';

const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store);
// TODO to use browserHistory
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app')
);
