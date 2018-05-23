import React, {Component} from 'react';
import AuxiliaryComponent from '../../hoc/AuxiliaryComponent';
import cssClass from './Navbar.css';
import {Auth} from "aws-amplify/lib/index";

class Navbar extends Component {
    state = {
        username: '',
        isAuthenticated: false
    }

    componentDidMount() {
        // Get use's info
        Auth.currentAuthenticatedUser().then(user => this.setState({user}));
        Auth.currentUserInfo()
            .then(user => {
                this.setState({
                    username: user.username,
                    isAuthenticated: true
                });
            })
            .catch(error => console.log('Error retrieving user\' info: ', error));
    }

    render() {
        return(
            <AuxiliaryComponent>
                <nav className="navbar sticky-top navbar-expand-lg navbar-dark orange darken-4">
                    <a
                        href={'/'}
                        className={cssClass.navBrand + " navbar-brand"}
                    >
                        Lightning.Talk
                    </a>
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
                                <a
                                    className="nav-link"
                                    href="/submit-lightning-talk"
                                >
                                    <i className="fas fa-video fa-2x mx-1"/>
                                </a>
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
                                    !this.state.isAuthenticated && (
                                        <div
                                            className="dropdown-menu dropdown-primary dropdown-menu-right"
                                            aria-labelledby="navbarDropdownMenuLink"
                                        >
                                            <a className="dropdown-item" href="/authenticate">Sign In</a>
                                        </div>
                                    )
                                }
                                {
                                    this.state.isAuthenticated && (
                                        <div
                                            className="dropdown-menu dropdown-primary dropdown-menu-right"
                                            aria-labelledby="navbarDropdownMenuLink"
                                        >
                                            <span className="dropdown-item">Hi! {this.state.username}</span>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="#">Profile</a>
                                            <a
                                                className="dropdown-item"
                                                onClick={() => {
                                                Auth.signOut()
                                                    .then(() => {this.props.history.push('/authenticate')})
                                                    .catch(error => console.log('Error signing out: ', error));
                                            }}>Sign Out</a>
                                        </div>
                                    )
                                }

                            </li>
                        </ul>
                    </div>
                </nav>
            </AuxiliaryComponent>
        );
    }
}

export default Navbar;