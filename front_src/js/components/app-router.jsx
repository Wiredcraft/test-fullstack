
const React = require("react");

const ReactRouterDom = require('react-router-dom');
const HashRouter = ReactRouterDom.HashRouter;
const Route = ReactRouterDom.Route;
const Switch = ReactRouterDom.Switch;

const TalkList = require("./talk-list.jsx");

class AppRouter extends React.Component {

	constructor() {
		this.routes = (
			<Switch>
				<Route exact path="/" component={TalkList} />
				<Route exact path="/talks" component={TalkList} />
				<Route exact path="*" component={TalkList} />
			</Switch>
		);
	}

	render() {
		return (
			<HashRouter>
				{this.routes}
			</HashRouter>
		);
	}
}

module.exports = AppRouter;