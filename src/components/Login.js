import React, { Component } from 'react';
import { AUTH_TOKEN } from '../constants';

export default class Login extends Component {
  state = {
    login: true, //Login or Signup
    email: '',
    password: '',
    name: ''
  };

  render() {
    const { login, email, password, name } = this.state;

    return (
      <div>
        <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
        <div className="flex flex-column">
          {!login && (
            <input
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              placeholder="Name"
            />
          )}
          <input
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Email Address"
          />
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Super safe password"
          />
        </div>
        <div className="flex mt3">
          <div className="pointer mr2 button" onClick={() => this._confirm()}>
            {login ? 'login' : 'create account'}
          </div>
          <div
            className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {login ? 'create account?' : 'got an account?'}
          </div>
        </div>
      </div>
    );
  }
}
