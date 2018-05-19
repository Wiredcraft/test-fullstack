import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import {Auth} from 'aws-amplify';

class SignUp extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        phone_number: '',
        authCode: '',
        showConfirmation: false
    }

    onChange = (key, value) => {
        this.setState({
            [key]: value
        });
    }

    signUp = () => {
        const { username, password, email, phone_number } = this.state;
        Auth.signUp({
            username,
            password,
            attributes: {
                email,
                phone_number
            }
        })
            .then(() => this.setState({ showConfirmation: true }))
            .catch(error => console.log('Error singing up: ', error));
    }

    confirmSignUp = () => {
        Auth.confirmSignUp(this.state.username, this.state.authCode)
            .then(() => this.props.history.push('/'))
            .catch(error => console.log('Error confirming signing up: ', error))
    }

    resendSignUp = () => {
        Auth.resendSignUp(this.state.username)
            .then(() => console.log('Verification code resent to user\'s phone'))
            .catch(error => console.log('Error resending verification code for signing up: ', error))
    }

    render() {
        const { showConfirmation } = this.state;
        return (
            <div>
                {
                    !showConfirmation && (
                        <div>
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    type="username"
                                    className="form-control"
                                    placeholder="Username"
                                    onChange={event => this.onChange('username', event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={event => this.onChange('password', event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email"
                                       className="form-control"
                                       placeholder="you@email.com"
                                       onChange={event => this.onChange('email', event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    placeholder="+8613022121892"
                                    onChange={event => this.onChange('phone_number', event.target.value)}
                                />
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={this.signUp}
                            >
                                Sign Up
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => {this.setState({showConfirmation : true})}}
                            >
                                Already Signed Up!
                            </button>
                        </div>

                    )
                }
                {
                    showConfirmation && (
                        <div>
                            <div className="form-group">
                                <label>Authentication Code</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="000111"
                                    onChange={event => this.onChange('authCode', event.target.value)}
                                />
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={this.confirmSignUp}
                            >
                                Confirm Sing Up
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={this.resendSignUp}
                            >
                                Resend Verification Code
                            </button>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default withRouter(SignUp);