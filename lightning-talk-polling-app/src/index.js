import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Amplify from 'aws-amplify';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import config from './aws-exports';
import reducer from './store/reducers/reducer';
import './index.css';

const store = createStore(reducer);

Amplify.configure(config);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
