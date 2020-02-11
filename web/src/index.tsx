import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import {Provider} from './index.provider';

import './index.scss';

ReactDOM.render(
	<Provider>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>,
	document.getElementById('root')
);
