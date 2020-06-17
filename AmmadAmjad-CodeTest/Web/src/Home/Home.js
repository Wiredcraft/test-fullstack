import React, { Component } from 'react'
import './Home.css';

import Comments from '../Comments/Comments';
import LoginModal from '../LoginModal/LoginModal';
import RegistrationModal from '../RegistrationModal/RegistrationModal';


export default class Home extends Component {

    constructor(props) {
        super(props);
        const token = localStorage.getItem('token');
        console.log(token);

        if (token === null || token === undefined || token === '') {
            this.state = {
                showLoginModal: false,
                showRegisterModal: false,
                isLoggedIn: false,
                name: '',
                email: '',
                showNotification: false,
                notification: ''
            };
        } else {
            this.state = {
                showLoginModal: false,
                showRegisterModal: false,
                isLoggedIn: true,
                name: localStorage.getItem('name'),
                email: localStorage.getItem('email'),
                showNotification: false,
                notification: ''
            };
        }
        this.displayLoginModal = this.displayLoginModal.bind(this);
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.closeLoginModal = this.closeLoginModal.bind(this);
        this.logout = this.logout.bind(this);
        this.displayRegistratiionModal = this.displayRegistratiionModal.bind(this);
        this.hideRegistratiionModal = this.hideRegistratiionModal.bind(this);
        this.onRegistrationSuccess = this.onRegistrationSuccess.bind(this);
        this.hideNotification = this.hideNotification.bind(this);
        this.displayNotification = this.displayNotification.bind(this);
        this.onAddNewCommentSuccess = this.onAddNewCommentSuccess.bind(this);
    }

    hideNotification(e) {
        this.setState({
            showNotification: false,
            notification: ''
        })
    }

    displayNotification(msg) {
        this.setState({
            notification: msg,
            showNotification: true,
        })
        const ctx = this;
        setTimeout(function (res) {
            ctx.hideNotification();
        }, 3000)
    }

    displayRegistratiionModal(e) {
        this.setState({
            showRegisterModal: true
        })
    }

    hideRegistratiionModal(e) {
        this.setState({
            showRegisterModal: false
        })
    }

    displayLoginModal(e) {
        this.setState({
            showLoginModal: true,
        });
    }

    closeLoginModal(e) {
        this.setState({
            showLoginModal: false
        })
    }

    logout(e) {
        localStorage.setItem('token', '');
        localStorage.setItem('name', '');
        localStorage.setItem('email', '');
        this.setState({
            showLoginModal: false,
            isLoggedIn: false,
            name: '',
            email: ''
        })
        this.displayNotification("Logout Successful")
    }

    onLoginSuccess(e) {
        this.setState({
            showLoginModal: false,
            isLoggedIn: true,
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email')
        })
        this.displayNotification("Login Successful")
    }

    onRegistrationSuccess(e) {
        this.hideRegistratiionModal()
        this.displayNotification("Registration Successful")
    }

    onAddNewCommentSuccess(e) {
        this.displayNotification("Commented added successfully")
    }
    render() {
        return (
            <div className="home">

                {
                    this.state.showNotification ? 
                    <div className="notificationContainer">
                        <label className="message">{this.state.notification}</label>
                        <button onClick={this.hideNotification}>Close</button>
                    </div> :
                    null
                }
                
                <label className="brandName">HACKER NEWS</label>
                <div className="centerContaienr">
                    <Comments key={this.state.isLoggedIn}  props={{isLoggedIn : this.state.isLoggedIn}} onAddNewComment={e => this.onAddNewCommentSuccess(e)}/>
                </div>

                {
                    this.state.isLoggedIn ? 
                    <div className="loginContainer">

                        <label className="username">{this.state.name}</label>
                        <label className="email">{this.state.email}</label>
                        <div className="btLogin" onClick={this.logout}>LOGOUT</div>
                    </div> :
                    <div className="loginContainer">
                        <label>Please login to add new comments or vote for existing comments.</label>
                        <div className="btLogin" onClick={this.displayLoginModal}>LOGIN</div>

                        <label className="margin50">Not a member yet? Create a new account to get started.</label>
                        <div className="btLogin" onClick={this.displayRegistratiionModal}>REGISTER</div>
                    </div>
                }
                
                


                <LoginModal show={this.state.showLoginModal} handleClose={e => this.closeLoginModal(e)} handleSuccess={e => this.onLoginSuccess(e)}/>

                <RegistrationModal show={this.state.showRegisterModal} handleClose={e => this.hideRegistratiionModal(e)} handleSuccess={e => this.onRegistrationSuccess(e)}/>
            </div>
        )
    }
}
