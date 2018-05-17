import React, {Component} from 'react';
import {Auth} from 'aws-amplify';

class SignUp extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        phone_number: '',
        authCode: ''
    }

    onChange = (key, value) => {
        this.setState({
            [key]: value
        });
    }

    signUp = () => {
        const {username, password, email, phone_number} = this.state;
        Auth.signUp({
            username,
            password,
            attributes: {
                email,
                phone_number
            }
        })
            .then(() => console.log('Waiting for confirmation to join LIGHT NINNNNNG'))
            .catch(error => console.log('Error singing up: ', error));
    }

    confirmSignUp = () => {
        Auth.confirmSignUp(this.state.username, this.state.authCode)
            .then(() => console.log('Registration confirmed! welcome to LIGHT NINNNNNG'))
            .catch(error => console.log('Error confirming registration: ', error));
    }

    render() {
        return (
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
            </div>
        );
    }
}

export default SignUp;