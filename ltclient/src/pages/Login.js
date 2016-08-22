import React from 'react';
import { Link } from 'react-router';

const Login = () => (
  <div className="main">
    <div className="login-form">
      <div className="login-form__header">
        <h3>Login</h3>
      </div>

      <form role="form">
        <label>Email / Username</label>
        <input type="text" placeholder="Your Email or Username" />
        <label>Password</label>
        <input type="password" placeholder="Your password" />
        <button type="submit">Login</button>
      </form>

      <div className="login-form__footer">
        <span>Not a member? </span>
        <Link to="signup">Signup here</Link>
      </div>
    </div>
  </div>
);

export default Login;
