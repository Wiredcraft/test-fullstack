import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, Router } from 'react-router-dom';

import Layout from './views/Layout';
import "./scss/style.scss";

import configureStore from './core/store';
import history from './core/history';
import "regenerator-runtime/runtime";
import '@babel/polyfill';

const store = configureStore();
const rootElement = document.getElementById('root');


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Layout />
    </Router>
  </Provider>,
  rootElement
);
