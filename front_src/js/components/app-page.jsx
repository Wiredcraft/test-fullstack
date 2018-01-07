
const React = require("react");

const ReactRouterDom = require('react-router-dom');
const Link = ReactRouterDom.Link;

const AppButton = require('./app-button.jsx');

/**
 * This component is a container for the page
 * It can be useful to add common display or actions to the whole application:
 * for example a menu, or manage rights of the user
 */
class AppPage extends React.Component {

	logout() {
		delete window.localStorage.currentUsername;
		app.render();
	}


	render() {
		const self = this;
		if (app.state.isInitialized) {
			const buttons = [];
			// If a user is connected, they can create talks
			if (app.userIsConnected()) {
				buttons.push(
					<AppButton key="0" to="/talk-create">New Talk</AppButton>
				);
				buttons.push(
					<AppButton key="1" onClick={self.logout}>Logout</AppButton>
				);
			}
			// Otherwise they can only register or login
			else {
				buttons.push(
					<AppButton key="0" to="/login">Login</AppButton>
				);
				buttons.push(
					<AppButton key="1" to="/register">Register</AppButton>
				);
			}
			return (
				<div className="app-container">
					<div className="buttons">{buttons}</div>
					{app.userIsConnected() ? 
						<div>Connected as {window.localStorage.currentUsername}</div>
					:
						null
					}
					{self.props.children}
				</div>
			);
		}
		else {
			return (
				<div className="first-loader">
					<div className="loader-horizontal">
						<img src="dist/loader.gif" />
					</div>
				</div>
			);
		}
	}
}

module.exports = AppPage;