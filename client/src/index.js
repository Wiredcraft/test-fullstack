import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from "redux";
import ReduxPromise from "redux-promise";
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import App from './components/app/app.component';
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <App />
    </Provider>,
    document.getElementById('container')
);

registerServiceWorker();
