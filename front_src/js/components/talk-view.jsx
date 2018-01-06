
const React = require("react");
const ReactRouterDom = require('react-router-dom');
const Link = ReactRouterDom.Link;

const AppPage = require('./app-page.jsx');

class TalkView extends React.Component {

	/**
	 * Retrieves the talk
	 */
	get(id) {
		app.services.getTalk(id, function(res) {
			app.state.data.currentTalk = res;
			app.render();
		});
	}


	render () {
		const id = this.props.match.params.id;
		// If the talk is loaded
		if (app.state.data.currentTalk
				&& app.state.data.currentTalk.id 
				&& app.state.data.currentTalk.id == id) {
			const talk = app.state.data.currentTalk;
			return (
				<AppPage>
					<div className="buttons">
						<Link className="button" to="/">Back to list</Link>
					</div>
					<h1>{talk.title}</h1>
					<div className="description">{talk.description}</div>
					<div className="username">Written by {talk.username}</div>
				</AppPage>
			)
		}
		// If the talk is loaded, get it from the server
		else {
			// If we don't do this, a lot of requests are sent at once
			if (undefined === app.state.data.currentTalk) {
				this.get(id);
			}
			app.state.data.currentTalk = {};

			// Display "loading" message
			return (
				<AppPage>
					<div>Loading talk...</div>
				</AppPage>
			);
		}
	}
}
module.exports = TalkView;