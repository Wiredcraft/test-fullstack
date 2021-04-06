import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import history from '../history';

class AuthButtons extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let _this = this;
		if ('undefined' != typeof _this.props.userData && 'undefined' != typeof _this.props.userData.token && _this.props.userData.token && _this.props.userData.token != '') {
			return (
				<Fragment>
				<span className="username">{_this.props.userData.username}</span> 
				<a className="signBtns"
				onClick={() => {
					_this.props.setUserData({});
					localStorage.removeItem('userData');
					history.push('/');
				}}
				>SignOut</a>
				</Fragment>
			);
		} else{
			return (
				<Fragment>
					<Link to="/signUp" className="signBtns">SignUp</Link>
					<Link to="/signIn" className="signBtns">SignIn</Link>
				</Fragment>
			);
		}
	}

}

const stateToProps = (state) => {
	return {
		userData: state.userData
	};
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

export default connect(stateToProps,dispatchToProps)(AuthButtons);
