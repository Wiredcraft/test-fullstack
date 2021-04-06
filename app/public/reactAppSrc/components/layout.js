import React, { Component, Fragment } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import AuthButtons from './authButtons';
import PrivateRoute from './privateRoute';

import talks from './talks.js';
import submitTalk from './addNewTalk.js';
import signIn from './signIn.js';
import signUp from './signUp.js';

class layout extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userData: {}
		};
	}

	render() {
		return (
			<Fragment>
				<ul className="header_menu">
					<li className="logo">Lightning Talk Polling</li>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/submit">Submit-New-Talk</Link></li>
					<li className="userInfo"><AuthButtons /></li>
				</ul>
				<Switch>
					<Route path="/" exact component={talks} />
					<PrivateRoute path="/submit" refPath="/submit" component={submitTalk} />
					<Route path="/signin" component={signIn} />
					<Route path="/signup" component={signUp} />
				</Switch>
			</Fragment>
		);
	}
	
}

export default layout;
