import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { login } from '../actions';

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.dispatch(login({
      username: this.refs.username.value,
      password: this.refs.password.value,
    }));
  }

  render = () => {
    return (
      <div className="main">
        <div className="login-form">
          <div className="login-form__header">
            <h3>Login</h3>
          </div>

          <form role="form" onSubmit={this.handleSubmit}>
            <label>Email / Username</label>
            <input type="text" ref="username" placeholder="Your Email or Username" />
            <label>Password</label>
            <input type="password" ref="password" placeholder="Your password" />
            <button type="submit">Login</button>
          </form>

          <div className="login-form__footer">
            <span>Not a member? </span>
            <Link to="signup">Signup here</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Login);
