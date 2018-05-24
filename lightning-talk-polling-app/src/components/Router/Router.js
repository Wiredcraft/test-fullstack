import React, {Component} from 'react';
import {Auth} from 'aws-amplify';
import Authenticator from '../Auth/Authenticator';
import {
    withRouter,
    Switch,
    Route,
    Redirect,
    BrowserRouter as Router
} from 'react-router-dom';
import Home from '../Home/Home';
import SubmitLightningTalk from '../LightningTalk/SubmitLightningTalk';
import Profile from "../Profile/Profile";
import {connect} from 'react-redux';
import * as reduxActionTypes from '../../store/actions';


class PrivateRoute extends Component {

    componentDidMount() {
        this.unlisten = this.props.history.listen(() => {
            Auth.currentAuthenticatedUser()
                .then((response) => {
                    this.props.onAuthenticate(response.username);
                })
                .catch(error => {
                    // Force the user to log out
                    this.props.onSignOut();
                    this.props.history.push('/authenticate');
                    console.log('Error retrieving user\'s info. Force user to log out: ', error);
                });
        })
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        const {component: Component, ...rest} = this.props;

        return (
            <Route
                {...rest}
                render={props => {
                    return this.props.isUserAuthenticated ? (<Component {...props}/>) : (<Redirect to={{pathname: "/authenticate"}}/>)
                }}
            />
        );
    }
}

// Receive state
const mapStateToProps = state => {
    return {
        isUserAuthenticated: state.isUserAuthenticated,
        username: state.username
    }
}

// Dispatch action
const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: (username) => dispatch({
            type: reduxActionTypes.AUTHENTICATE,
            username: username
        }),
        onSignOut: () => dispatch({type: reduxActionTypes.SIGN_OUT})
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute));