import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, userData, refPath, ...rest }) => (
	<Route
		{...rest}
		render={
			(props) => (
				userData.token  ? <Component {...props} /> : <Redirect to={{ pathname: "/signIn", state: { from: refPath }}} />
			)
		}
	/>
)

const stateToProps = (state) => {
	return {
		userData: state.userData
	};
}

const dispatchToProps = (dispatch) => {
	return {};
}

export default connect(stateToProps, dispatchToProps)(PrivateRoute);