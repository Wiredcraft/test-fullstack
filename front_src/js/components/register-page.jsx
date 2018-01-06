
const React = require("react");

const ReactRouterDom = require('react-router-dom');
const Link = ReactRouterDom.Link;

class RegisterPage extends React.Component {

	/**
	 * Creates the user
	 */
	register() {
		const user = {
			username : document.forms['register'].username.value,
			password : document.forms['register'].password.value,
		}
		app.services.createUser(user, function(res) {
			app.state.currentUser = res;
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
					<Link className="button" to="/">Cancel</Link>
					<a className="button" onClick={this.register}>Register</a>
				</div>
				<form name="register" onSubmit={this.formFakeSubmit}>
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
									<input type="text" name="password" />
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
		);
	}
}

module.exports = RegisterPage;