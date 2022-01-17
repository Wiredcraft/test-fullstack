// Import External Dependencies
import { Fragment, useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Outlet,
} from 'react-router-dom';
import { signUp, signIn } from '../../api';

import styles from './Login.scss';

export function Login(props) {
  const handleLogin = (ev) => {
    ev.preventDefault();
    const data = new FormData(ev.target);
    const jsonData = Object.fromEntries(data);

    signIn(jsonData);
  }

  const handleCreate = (ev) => {
    ev.preventDefault();
    const data = new FormData(ev.target);
    const jsonData = Object.fromEntries(data);

    signUp(jsonData);
  }

  return (
    <div className={styles.root}>
      <b>Login</b>
      <br></br>
      <br></br>
      <form onSubmit={handleLogin}>
        <div className={styles.formFiled}>
          <label>username: </label>
          <input name="username" type="text"></input>
        </div>
        <div className={styles.formFiled}>
          <label>password: </label>
          <input name="password" type="password"></input>
        </div>
        <br></br>
        <button type="submit">login</button>
      </form>
      <br></br>
      <br></br>
      <b>Create Account</b>
      <br></br>
      <br></br>
      <form onSubmit={handleCreate}>
        <div className={styles.formFiled}>
          <label>username: </label>
          <input name="username" type="text"></input>
        </div>
        <div className={styles.formFiled}>
          <label>password: </label>
          <input name="password" type="password"></input>
        </div>
        <br></br>
        <button type="submit">create account</button>
      </form>
    </div>
  );
}
export default Login;
