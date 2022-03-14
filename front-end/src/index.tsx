import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import App from './App';

const title = 'Lightning Talk Polling';

ReactDOM.render(
    <BrowserRouter>
        <App title={title} />
    </BrowserRouter>,
    document.getElementById('app')
);

// module.hot.accept();