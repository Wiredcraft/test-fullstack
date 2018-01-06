
const React = require("react");

const ReactRouterDom = require('react-router-dom');
const HashRouter = ReactRouterDom.HashRouter;
const Route = ReactRouterDom.Route;
const Switch = ReactRouterDom.Switch;

const TalkList = require("./talk-list.jsx");
const LoginPage = require("./login-page.jsx");
const RegisterPage = require("./register-page.jsx");
const TalkCreate = require("./talk-create.jsx");
const TalkView = require("./talk-view.jsx");

class AppRouter extends React.Component {

	constructor() {
		this.routes = (
			<Switch>
				<Route exact path="/" component={TalkList} />
				<Route exact path="/talks" component={TalkList} />
				<Route exact path="/login" component={LoginPage} />
				<Route exact path="/register" component={RegisterPage} />
				<Route exact path="/talk-create" component={TalkCreate} />
				<Route exact path="/talk-view/:id" component={TalkView} />
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