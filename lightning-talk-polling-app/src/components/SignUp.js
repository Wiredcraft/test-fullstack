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
                <section className="form-elegant mt-5">
                    <div className="card">
                        <div className="card-body mx-4">
                            <div className="row d-flex justify-content-center">
                                {
                                    !showConfirmation && (
                                        <div className="col-md-6 text-left">
                                            <p className="h4 text-center mb-4">Register</p>
                                            <label for="defaultFormLoginEmailEx" className="grey-text ">*Username</label>
                                            <input
                                                id="defaultFormLoginEmailEx"
                                                type="username"
                                                className="form-control"
                                                placeholder="Username"
                                                onChange={event => this.onChange('username', event.target.value)}
                                            />
                                            <br/>
                                            <label for="defaultFormLoginPasswordEx" className="grey-text">*Your password</label>
                                            <input
                                                id="defaultFormLoginPasswordEx"
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                onChange={event => this.onChange('password', event.target.value)}
                                            />
                                            <br/>
                                            <label for="defaultFormLoginPasswordEx" className="grey-text">*Email</label>
                                            <input
                                                id="defaultFormLoginPasswordEx"
                                                type="email"
                                                className="form-control"
                                                placeholder="Email"
                                                onChange={event => this.onChange('email', event.target.value)}
                                            />
                                            <br/>
                                            <label for="defaultFormLoginPasswordEx" className="grey-text">*Phone Number (format should be: +8613022121892)</label>
                                            <input
                                                id="defaultFormLoginPasswordEx"
                                                type="tel"
                                                className="form-control"
                                                placeholder="+8613022121892"
                                                onChange={event => this.onChange('phone_number', event.target.value)}
                                            />
                                            <div className="text-center mt-4">
                                                <button
                                                    className="btn btn-cyan"
                                                    onClick={() => {this.setState({showConfirmation : true})}}
                                                >
                                                    Register
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => {this.setState({showConfirmation : true})}}
                                                >
                                                    Already Registered!
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    showConfirmation && (
                                        <div className="col-md-6 text-left">
                                            <p className="h4 text-center mb-4">Confirm Registration</p>
                                            <label for="confirmRegistration" className="grey-text">Confirmation Code (You'll receive 6-digits number on you phone)</label>
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
                                                    onClick={this.confirmSignUp}
                                                >
                                                    Confirm Registration
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={this.resendSignUp}
                                                >
                                                    Resend Code
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </section>
        );
    }
}

export default withRouter(SignUp);