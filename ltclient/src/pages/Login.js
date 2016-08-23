import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import Loading from '../components/Loading';
import { login } from '../actions';

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.dispatch(login({
      username: this.refs.username.value,
      password: this.refs.password.value,
    }));
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.token) {
      hashHistory.push('/');
    }
  }

  render = () => {
    if (this.props.isFetching) {
      return <Loading/ >
    } else {
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
}

function mapStateToProps(state) {
  return {
    token: state.user.token,
    isFetching: state.user.isFetching,
  };
}

export default connect(mapStateToProps)(Login);
