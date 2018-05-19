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
        const {history} = this.props;
        Auth.signIn(this.state.username, this.state.password)
            .then(user => {
                this.setState({ user, showConfirmation: true });
                history.push('/');

            })
            .catch(error => console.log('Error sing in: ', error));
    }

    render() {
        return (
            <div>
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
            </div>
        );
    }
}

export default withRouter(SignIn);