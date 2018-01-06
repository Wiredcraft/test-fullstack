
const React = require("react");

const ReactRouterDom = require('react-router-dom');
const Link = ReactRouterDom.Link;

const AppPage = require('./app-page.jsx');

/**
 * Form to write a new talk
 */
class TalkCreate extends React.Component {

	save() {
		const talk = {
			title : document.forms['talk-create'].title.value,
			description : document.forms['talk-create'].description.value,
			username : app.state.currentUser.username,
		}
		app.services.createTalk(talk, function(res) {
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
		return (
			<AppPage>
				<h1>New Talk</h1>
				<div className="buttons">
					<Link className="button" to="/">Cancel</Link>
					<a className="button" onClick={this.save}>Save</a>
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
}

module.exports = TalkCreate;