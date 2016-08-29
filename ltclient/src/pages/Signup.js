import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Loading from '../components/Loading';
import { signup } from '../actions';

class Signup extends Component {

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.token) {
      browserHistory.push('/');
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const email = this.email.value.trim();
    const username = this.username.value.trim();
    const password = this.password.value.trim();
    this.props.dispatch(signup({
      email,
      username,
      password,
    }));
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
              ref={c => { this.email = c; }}
              placeholder="john@example.com"
            />
            <label htmlFor="username">Username</label>
            <input
              type="text"
              ref={c => { this.username = c; }}
              placeholder="john"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              ref={c => { this.password = c; }}
              placeholder="Your password"
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

export default connect(mapStateToProps)(Signup);
