import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Router } from 'react-router-dom';
import history from './services/history';

import { UserProvider } from './contexts/user';

ReactDOM.render(
  <UserProvider>
    <Router history={history}>
      <App />
    </Router>
  </UserProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
