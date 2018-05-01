import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<div>{process.env.REACT_APP_API_URL}</div>, document.getElementById('container'));
registerServiceWorker();
