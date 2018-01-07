
const React = require("react");

const ReactRouterDom = require('react-router-dom');
const Link = ReactRouterDom.Link;

const AppButton = require('./app-button.jsx');

class LoginPage extends React.Component {
	login() {
		const user = {
			username : document.forms['login'].username.value,
			password : document.forms['login'].password.value,
		}
		app.services.login(user, function(res) {
			if (res) {
				app.state.currentUser = res;
			}

			/* To store the user logged in.
			 * Store only the username is obviously not secure, a real application
			 * would require for instance to store a session token. */
			window.localStorage.currentUsername = res.username
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
			<div>
				<h1>Login</h1>
				<div className="buttons">
					<AppButton to="/">Cancel</AppButton>
					<AppButton onClick={this.login}>Login</AppButton>
				</div>
				<form name="login" onSubmit={this.formFakeSubmit}>
					<table>
						<tbody>
							<tr>
								<td>User name</td>
								<td>
									<input type="text" name="username" />
								</td>
							</tr>
							<tr>
								<td>Password</td>
								<td>
									<input type="password" name="password" />
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
		);
	}
}

module.exports = LoginPage;