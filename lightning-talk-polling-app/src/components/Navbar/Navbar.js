import React, {Component} from 'react';
import {withRouter, Route, Link, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {Auth} from "aws-amplify/lib/index";

import * as reduxAction from "../../store/actions/actions";
import AuxiliaryComponent from '../../hoc/AuxiliaryComponent';
import PrivateRoute from '../Router/Router';
import SubmitLightningTalk from '../SubmitLightningTalk/SubmitLightningTalk';
import Authenticator from "../Auth/Authenticator";
import Home from '../Home/Home';
import Profile from "../Profile/Profile";
import cssClass from './Navbar.css';

class Navbar extends Component {

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
                                            <div className="dropdown-divider"/>
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

export default withRouter(connect(reduxAction.mapStateToProps, reduxAction.mapDispatchToProps)(Navbar));