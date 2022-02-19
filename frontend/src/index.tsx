import 'normalize.css';
import './css/index.scss';

import 'core-js/features/array/flat-map';
import 'core-js/features/map';
import 'core-js/features/promise';
import 'core-js/features/set';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from './store';
import App from './App';

const rootElement = document.getElementById('app');

const baseName = process.env.NODE_ENV !== 'production' ? '/' : '/test-fullstack'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={baseName}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  rootElement
);
