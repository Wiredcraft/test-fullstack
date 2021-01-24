import React from 'react';

import { FormWrapper } from '../../scss/form'

// Import components
import Login from './Login'
import Register from './Register'

class Auth extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <FormWrapper>
        <div>
          <h1>Login</h1>
          <Login authUser={this.props.authUser} />
        </div>
        <div>
          <h1>Sign Up</h1>
          <Register authUser={this.props.authUser} />
        </div>
      </FormWrapper>
    );
  }
}

export default Auth;
