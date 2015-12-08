import './index.html';
import 'babel-core/polyfill';
import 'normalize.css/normalize.css';
import './scss/app.scss';

import React, { Component, PropTypes } from 'react';
import { Provider, connect } from 'react-redux';
import ReactDOM from 'react-dom';
import Store from './store.jsx';
import Router from './router.jsx';


class Root extends Component {
  render() {
    return (
        <Provider store={Store}>
            <Router />
        </Provider>
    );
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('app')
);
