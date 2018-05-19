import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import {Auth} from 'aws-amplify';

class ForgotPassword extends Component {
    state = {
        username: '',
        password: '',
        authCode: '',
        showConfirmation: false
    }

    onChange = (key, value) => {
        console.log('key ' + key + ' value ' + value);
        this.setState({[key]: value});
        console.log(this.state.username);
    }

    forgotPassword = () => {
        Auth.forgotPassword(this.state.username)
            .then(() => {
                this.setState({ showConfirmation: true });
                console.log('Successfully send code to user\'s phone for password forgotten');
            })
            .catch(error => console.log('Error forgot password: ', error));
    }

    forgotPasswordSubmit = () => {
        Auth.forgotPasswordSubmit(this.state.username, this.state.authCode, this.state.password)
            .then(() => {
                this.props.history.push('/');
                console.log('Successfully set new password')
            })
            .catch(error => console.log('Error setting new password: ', error))
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
                            <button
                                className="btn btn-primary"
                                onClick={this.forgotPassword}
                            >
                                Forgot Password
                            </button>
                        </div>

                    )
                }
                {
                    showConfirmation && (
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
                                <label>Confirmation Code</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="000111"
                                    onChange={event => this.onChange('authCode', event.target.value)}
                                />
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={this.forgotPasswordSubmit}
                            >
                                Confirm Sing Up
                            </button>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default withRouter(ForgotPassword);