import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class signUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			errormsg_username: '',
			pwd: '',
			errormsg_pwd: '',
			re_pwd: '',
			errormsg_repwd: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange(event) {
		const target = event.target;
		const name = target.name;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		this.setState(
			{
				[name]: value
			}
		);
	}
	
	handleSubmit(event) {
		let _this = this;
		_this.setState(
			{
				errormsg_username : '',
				errormsg_pwd : '',
				errormsg_repwd: ''
			}
		);

		axios.post(
			'/api/user',
			{
				username: this.state.username ? this.state.username : null,
				pwd: this.state.pwd ? this.state.pwd : null,
				repwd: this.state.re_pwd ? this.state.re_pwd : null
			}
		).then(
			res => {
				if ('undefined' != typeof res.data.error) {
					res.data.error.forEach(
						function(item, index) {
							let name = 'errormsg_'+item.field;
							_this.setState({
								[name]: item.message
							});
						}
					);
				} else if (res.data.data.id && res.data.data.username) {
					_this.props.history.push("/signIn");
				}
        	}
		);
		event.preventDefault();
	}
	
	render() {
		return (
			<form method="POST" id="SIGNUP-FORM" className="form" onSubmit={this.handleSubmit}>
				<h2>Sign Up</h2>
				<ul>
					<li>
						<label>Username:</label>
						<input type="text" name="username" maxlength="16" value={this.state.username} onChange={this.handleChange} />
						<span className="error_msg">{this.state.errormsg_username}</span>
					</li>
					<li>
						<label>Password:</label>
						<input type="password" name="pwd" maxlength="32" value={this.state.pwd} onChange={this.handleChange} />
						<span className="error_msg">{this.state.errormsg_pwd}</span>
					</li>
					<li>
						<label>Retype Password:</label>
						<input type="password" name="re_pwd" maxlength="32" value={this.state.re_pwd} onChange={this.handleChange} />
						<span className="error_msg">{this.state.errormsg_repwd}</span>
					</li>
					<li className="btn_li">
						<input type="submit" value="Submit" />
					</li>
					<li>Has an account already? just go to <Link to="/signIn">SignIn</Link></li>
				</ul>
			</form>
		);
	}

}

export default signUp;