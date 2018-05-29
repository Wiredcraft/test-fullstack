import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Auth} from 'aws-amplify';
import {
    withRouter,
    Route,
    Redirect,
} from 'react-router-dom';

import * as reduxAction from '../../store/actions/actions';

class PrivateRoute extends Component {

    componentWillMount() {
        this.authenticate();
        this.unlisten = this.props.history.listen(() => {
            this.authenticate();
        })
    }

    componentWillUnmount() {
        this.unlisten();
    }

    authenticate() {
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
    }

    render() {
        const {component: Component, ...rest} = this.props;
        return (
            <Route
                {...rest}
                render={props => {
                    return (this.props.isUserAuthenticated || !this.props.username) ?
                        (<Component {...props}/>) :
                        (<Redirect to={{pathname: "/authenticate"}}/>)
                }}
            />
        );
    }
}

export default withRouter(connect(reduxAction.mapStateToProps, reduxAction.mapDispatchToProps)(PrivateRoute));