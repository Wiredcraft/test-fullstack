
const React = require("react");

const ReactRouterDom = require('react-router-dom');
const Link = ReactRouterDom.Link;

/**
 * This component is a container for the page
 */
class AppPage extends React.Component {
	render() {
		const self = this;
		if (app.state.isInitialized) {
			const buttons = [];
			// If a user is connected, they can create talks
			if (app.state.currentUser) {
				buttons.push(
					<Link key="0" className="button" to="/talk-create">New Talk</Link>
				);
			}
			// Otherwise they can only register or login
			else {
				buttons.push(
					<Link key="0" className="button" to="/login">Login</Link>
				);
				buttons.push(
					<Link key="1" className="button" to="/register">Register</Link>
				);
			}
			return (
				<div className="app-container">
					<div className="buttons">{buttons}</div>
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