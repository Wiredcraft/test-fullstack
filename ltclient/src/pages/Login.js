import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Loading from '../components/Loading';
import { login, fetchUserVotedTalks } from '../actions';

class Login extends Component {

  state = {
    username: '',
    password: '',
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.token) {
      this.props.dispatch(fetchUserVotedTalks());
      browserHistory.push('/');
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const username = this.state.username.trim();
    const password = this.state.password.trim();

    const reqBody = {
      password,
    };

    // user can also login using email
    const email = /^[\w.-]+@[\w][\w-]*?(\.[\w-]+)*$/;
    email.test(username) ? reqBody.email = username
                         : reqBody.username = username;
    this.props.dispatch(login(reqBody));
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  render = () => {
    if (this.props.isFetching) {
      return <Loading />;
    }
    return (
      <div className="main">
        <div className="login-form">
          <div className="login-form__header">
            <h3>Login</h3>
          </div>
          <form role="form" onSubmit={this.handleSubmit}>
            <label htmlFor="username">Email / Username</label>
            <input
              type="text"
              placeholder="Your Email or Username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Your password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
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

Login.propTypes = {
  dispatch: PropTypes.func,
  isFetching: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    token: state.user.token,
    userId: state.user.userId,
    isFetching: state.user.isFetching,
  };
}

export { Login };
export default connect(mapStateToProps)(Login);
