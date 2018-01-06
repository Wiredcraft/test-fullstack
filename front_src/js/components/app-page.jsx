
const React = require("react");

/**
 * This component is a container for the page
 */
class AppPage extends React.Component {
	render() {
		const self = this;
		if (app.state.isInitialized) {
			return (
				<div className="app-container">
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