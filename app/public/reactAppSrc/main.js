import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Provider } from "react-redux";
import { HashRouter as Router } from 'react-router-dom';

import history from './history';
import store from './store';
import Layout from './components/layout.js';

import "./css/site.css";

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router history={history}>
					<Layout />
				</Router>
			</Provider>
		);
	}
}

ReactDom.render(
	<App />,
	document.getElementById('APP')
);
