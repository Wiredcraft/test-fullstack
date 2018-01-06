
const React = require("react");

const ReactRouterDom = require('react-router-dom');
const Link = ReactRouterDom.Link;

class LoginPage extends React.Component {
	login() {
		const user = {
			username : document.forms['login'].username.value,
			password : document.forms['login'].password.value,
		}
		app.services.login(user, function(res) {
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
					<a className="button" onClick={this.login}>Login</a>
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