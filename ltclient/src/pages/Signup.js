import React from 'react';
import { Link } from 'react-router';

const Signup = () => (
  <div className="main">
    <div className="login-form">
      <div className="login-form__header">
        <h3>Sign up</h3>
      </div>

      <form role="form">
        <label>Email</label>
        <input type="email" placeholder="john@example.com" />
        <label>Username</label>
        <input type="text" placeholder="john" />
        <label>Password</label>
        <input type="password" placeholder="Your password" />
        <button type="submit">Sign up</button>
      </form>

      <div className="login-form__footer">
        <span>Already a member? </span>
        <Link to="login">Login here</Link>
      </div>
    </div>
  </div>
);

export default Signup;
