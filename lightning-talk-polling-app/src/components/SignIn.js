import React, {Component} from 'react';
import {Auth} from 'aws-amplify';
import {withRouter} from 'react-router-dom';

class SignIn extends Component {
    state = {
        username: '',
        password: '',
        authCode: '',
        user: {},
        showConfirmation: false
    }

    onChange = (key, value) => {
        this.setState({[key]: value});
    }

    signIn = () => {
        Auth.signIn(this.state.username, this.state.password)
            .then(user => this.setState({ user, showConfirmation: true }))
            .catch(error => console.log('Error sing in: ', error));
    }

    confirmSignIn = () => {
        const {history} = this.props;

        Auth.confirmSignIn(this.state.user, this.state.authCode)
            .then(user => history.push('/'))
            .catch(error => console.log('Error confirming sing in: ', error));
    }

    render() {
        return (
            <div>
                {
                    !this.state.showConfirmation && (
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
                            <button
                                className="btn btn-primary"
                                onClick={this.signIn}
                            >
                                Sign In
                            </button>
                        </div>
                    )
                }
                {
                    this.state.showConfirmation && (
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
                                onClick={this.confirmSignIn.bind(this)}
                            >
                                Confirm Sing In
                            </button>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default withRouter(SignIn);