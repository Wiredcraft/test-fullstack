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
            <section className="form-elegant mt-5">
                <div className="card">
                    <div className="card-body mx-4">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-6 text-left">
                                <p className="h4 text-center mb-4">Forgot Password</p>
                                {
                                    !showConfirmation && (
                                        <div>
                                            <label for="defaultFormLoginEmailEx" className="grey-text ">Username</label>
                                            <input
                                                id="defaultFormLoginEmailEx"
                                                type="username"
                                                className="form-control"
                                                placeholder="Username"
                                                onChange={event => this.onChange('username', event.target.value)}
                                            />
                                            <div className="text-center mt-4">
                                                <button
                                                    className="btn btn-cyan"
                                                    onClick={this.forgotPassword}
                                                >
                                                    Get New Password
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    showConfirmation && (
                                        <div>
                                            <label for="defaultFormLoginEmailEx" className="grey-text ">*Username</label>
                                            <input
                                                id="defaultFormLoginEmailEx"
                                                type="username"
                                                className="form-control"
                                                placeholder="Username"
                                                onChange={event => this.onChange('username', event.target.value)}
                                            />
                                            <label for="defaultFormLoginPasswordEx" className="grey-text">*New password</label>
                                            <input
                                                id="defaultFormLoginPasswordEx"
                                                type="password"
                                                className="form-control"
                                                placeholder="New Password"
                                                onChange={event => this.onChange('password', event.target.value)}
                                            />
                                            <label for="confirmRegistration" className="grey-text">*Confirmation Code (You'll receive 6-digits number on you phone)</label>
                                            <input
                                                id="confirmRegistration"
                                                type="number"
                                                className="form-control"
                                                placeholder="123456"
                                                onChange={event => this.onChange('authCode', event.target.value)}
                                            />
                                            <div className="text-center mt-4">
                                                <button
                                                    className="btn btn-cyan"
                                                    onClick={this.forgotPasswordSubmit}
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default withRouter(ForgotPassword);