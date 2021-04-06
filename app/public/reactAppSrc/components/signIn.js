import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import history from '../history';

class signIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			errormsg_username: '',
			pwd: '',
			errormsg_pwd: ''
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
				errormsg_pwd : ''
			}
		);
		axios.put(
			'/api/user/0',
			{
				username: this.state.username ? this.state.username : null,
				pwd: this.state.pwd ? this.state.pwd : null
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
				} else if (res.data.token && res.data.token != '') {
					let userData = 	{
						user_id: res.data.data.id,
						username: res.data.data.username,
						token: res.data.token,
						created_at: res.data.data.created_at
					};
					this.props.setUserData(userData);
					localStorage.setItem('userData', JSON.stringify(userData));
					let from;
					if (this.props.location.state != null)
						from = this.props.location.state.from;
					const urlTo = from || '/';
					history.push(urlTo);
				}
        	}
		);
		event.preventDefault();
	}
	
	render() {
		return (
			<form id="SIGNIN-FORM" className="form" onSubmit={this.handleSubmit}>
				<h2>Sign In</h2>
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
					<li className="btn_li"><input type="submit" value="Signin" /></li>
					<li>No account yet? just go to <Link to="/signUp">SignUp</Link></li>
				</ul>
			</form>
		);
	}
	
}

const stateToProps = (state) => {
	return {};
}

const dispatchToProps = (dispatch) => {
	return {
		setUserData(userData) {
			let action ={
				type: 'USER',
				value: userData
			}
			dispatch(action);
		}
	};
}

export default connect(stateToProps,dispatchToProps)(signIn);
