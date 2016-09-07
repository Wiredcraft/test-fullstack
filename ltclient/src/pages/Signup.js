import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Loading from '../components/Loading';
import { signup } from '../actions';

class Signup extends Component {

  state = {
    email: '',
    username: '',
    password: '',
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.token) {
      browserHistory.push('/');
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const email = this.state.email.trim();
    const username = this.state.username.trim();
    const password = this.state.password.trim();
    this.props.dispatch(signup({
      email,
      username,
      password,
    }));
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  render = () => {
    const { isFetching } = this.props;
    if (isFetching) {
      return <Loading />;
    }
    return (
      <div className="main">
        <div className="form form--login">
          <div className="form__header">
            <h3>Sign up</h3>
          </div>
          <form role="form" onSubmit={this.handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="john"
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
            <button type="submit">Sign up</button>
          </form>

          <div className="form__footer">
            <span>Already a member? </span>
            <Link to="login">Login here</Link>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  dispatch: PropTypes.func,
  isFetching: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    token: state.user.token,
    isFetching: state.user.isFetching,
  };
}

export { Signup };
export default connect(mapStateToProps)(Signup);
