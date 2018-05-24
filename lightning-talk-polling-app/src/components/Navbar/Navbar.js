import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import Home from '../Home/Home';
import SubmitLightningTalk from '../LightningTalk/SubmitLightningTalk';
import AuxiliaryComponent from '../../hoc/AuxiliaryComponent';
import cssClass from './Navbar.css';
import {Auth} from "aws-amplify/lib/index";
import Authenticator from "../Auth/Authenticator";
import Profile from "../Profile/Profile";
import PrivateRoute from '../Router/Router';
import {connect} from 'react-redux';

import { withRouter } from 'react-router-dom'
import * as reduxActionTypes from "../../store/actions";


class Navbar extends Component {

    componentWillMount() {
        // Get use's info
        Auth.currentAuthenticatedUser()
            .then(response => {
                this.props.onAuthenticate();
                this.setState(() => {return {username: response.username}});
            })
            .catch(error => {
                // Force the user to log out
                this.props.onSignOut();
                this.props.history.push('/authenticate');
                console.log('Error retrieving user\'s info. Force user to log out: ', error);
            });
    }

    signOut = () => {
        Auth.signOut()
            .then(() => {
                this.props.onSignOut();
                this.props.history.push('/authenticate');
            })
            .catch(error => console.log('Error signing out: ', error));
    }

    render() {
        return(
            <AuxiliaryComponent>
                <nav className="navbar sticky-top navbar-expand-lg navbar-dark orange darken-4">
                    <Link
                        to="/"
                        className={cssClass.navBrand + " navbar-brand"}
                    >
                        Lightning.Talk
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button" data-toggle="collapse"
                        data-target="#basicExampleNav"
                        aria-controls="basicExampleNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div
                        className="collapse navbar-collapse justify-content-end"
                        id="basicExampleNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/submit-lightning-talk"
                                >
                                    <i className="fas fa-video fa-2x mx-1"/>
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    id="navbarDropdownMenuLink"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-user fa-2x mx-1"/>
                                </a>
                                {
                                    !this.props.isUserAuthenticated ?
                                        <div
                                            className="dropdown-menu dropdown-primary dropdown-menu-right"
                                            aria-labelledby="navbarDropdownMenuLink"
                                        >
                                            <Link className="dropdown-item" to="/authenticate">Sign In</Link>
                                        </div>
                                    :
                                        <div
                                            className="dropdown-menu dropdown-primary dropdown-menu-right"
                                            aria-labelledby="navbarDropdownMenuLink"
                                        >
                                            <span className="dropdown-item">Hi! {this.props.username}</span>
                                            <div className="dropdown-divider"></div>
                                            <Link className="dropdown-item" to="/profile">Profile</Link>
                                            <Link
                                                to="/authenticate"
                                                className="dropdown-item"
                                                onClick={this.signOut}
                                            >
                                                Sign Out
                                            </Link>
                                        </div>
                                }
                            </li>
                        </ul>
                    </div>
                </nav>
                <Switch>
                    <Route
                        path={'/authenticate'}
                        component={Authenticator}
                    />
                    <PrivateRoute
                        path={'/profile'}
                        component={Profile}
                    />
                    <PrivateRoute
                        path={'/submit-lightning-talk'}
                        component={SubmitLightningTalk}
                    />
                    <PrivateRoute
                        path={'/'}
                        component={Home}
                    />
                </Switch>
            </AuxiliaryComponent>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));