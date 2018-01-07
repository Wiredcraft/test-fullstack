
const React = require("react");

const ReactRouterDom = require('react-router-dom');
const Link = ReactRouterDom.Link;

const AppPage = require('./app-page.jsx');
const AppButton = require('./app-button.jsx');

/**
 * Form to write a new talk
 */
class TalkCreate extends React.Component {

	save() {
		const talk = {
			title : document.forms['talk-create'].title.value,
			description : document.forms['talk-create'].description.value,
			username : window.localStorage.currentUsername,
		}
		app.services.createTalk(talk, function(res) {
			app.services.getTalks(function(talks) {
				app.state.data.talks = talks;
				app.render();
			})
			window.location.href = '#';
		});
	}


	/**
	 * Avoids reloading the page when pressing the "Enter" key
	 */
	formFakeSubmit(event) {
		event.stopPropagation();
		event.preventDefault();
	}


	render () {
		if (app.userIsConnected()) {
			return (
				<AppPage>
					<h1>New Talk</h1>
					<div className="buttons">
						<AppButton to="/">Cancel</AppButton>
						<AppButton onClick={this.save}>Save</AppButton>
					</div>
					<form name="talk-create" onSubmit={this.formFakeSubmit}>
						<table>
							<tbody>
								<tr>
									<td>Title</td>
									<td>
										<input type="text" name="title" />
									</td>
								</tr>
								<tr>
									<td>Description</td>
									<td>
										<textarea name="description" />
									</td>
								</tr>
							</tbody>
						</table>
					</form>
				</AppPage>
			);
		}
		else {
			window.location.href = '#';
			return <AppPage />;
		}
	}
}

module.exports = TalkCreate;