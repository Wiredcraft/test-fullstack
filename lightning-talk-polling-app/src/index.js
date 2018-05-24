import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import config from './aws-exports';
import Amplify from 'aws-amplify';
import {createStore} from 'redux';
import reducer from './store/reducers/authenticator';
import {Provider} from 'react-redux';

Amplify.configure(config);

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
