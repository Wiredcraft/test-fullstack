import React from 'react';

// Import components
import Login from './Login'
import Register from './Register'

class Auth extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Login</h1>
        <Login authUser={this.props.authUser} />
        <hr />
        <h1>Or</h1>
        <hr />
        <h1>Sign Up</h1>
        <Register authUser={this.props.authUser} />
      </div>
    );
  }
}

export default Auth;
