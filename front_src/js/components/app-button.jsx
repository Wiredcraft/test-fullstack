
const React = require("react");

const ReactRouterDom = require('react-router-dom');
const Link = ReactRouterDom.Link;

class AppButton extends React.Component {
	render() {
		if (this.props.to) {
			return (
				<Link className="button" to={this.props.to}>
					{this.props.children}
				</Link>
			);
		}
		else {
			return (
				<a className="button" onClick={this.props.onClick} href="javascript:void(0);">
					{this.props.children}
				</a>
			);
		}
	}
}

module.exports = AppButton;
