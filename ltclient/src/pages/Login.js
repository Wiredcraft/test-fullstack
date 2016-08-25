import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Loading from '../components/Loading';
import { login, fetchUserVotedTalks } from '../actions';

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    let password = this.refs.password.value.trim();
    let username = this.refs.username.value.trim();
    let reqBody = {
      password,
    };

    // user can also login using email
    let email = /^[\w.-]+@[\w][\w-]*?(\.[\w-]+)*$/;
    email.test(username) ? reqBody.email = username
                         : reqBody.username = username;
    this.props.dispatch(login(reqBody));
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.token) {
      this.props.dispatch(fetchUserVotedTalks(nextProps.userId));
      browserHistory.push('/');
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
    userId: state.user.userId,
    isFetching: state.user.isFetching,
  };
}

export default connect(mapStateToProps)(Login);
