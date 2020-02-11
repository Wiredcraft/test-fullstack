import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Link, useHistory } from 'react-router-dom';
import './index.scss';
import { SERVER_PATH } from '../../config';
import { useAuth0 } from '../../index.provider';



function Login():JSX.Element {
  let history = useHistory()
  const [field, setField] = useState({userName: '', password: ''})
  const [errors, setErrors] = useState();
  const [message, setMessage] = useState();
  const { login } = useAuth0();

  async function postLogin(params) {
    try {
      const res = await fetch(`${SERVER_PATH}auth/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params),
      });
      const data = await res.json();
      if(data.errors || data.message){
        setErrors(data.errors);
        setMessage(data.message);
      } else {
        sessionStorage.setItem('token', data.access_token);
        login(data.access_token);
        history.push('/');
      }

    } catch(err) {
      setMessage('server down');
    }
    
    
  }

  function onChangeField(e) {
    const value = e.target.value;
    const name = e.target.name;
    field[name] = value;
    setField(field);
  }

  function onLogin(e) {
    postLogin(field);
    e.preventDefault();
  }

  return (
    <form className="mod-form">
      <div className="mod-form-field">
          <label>your nick: </label>
          <input 
          type="text" 
          name="userName" 
          onChange={onChangeField}
          />
      </div>
      <p>{errors && errors.userName && errors.userName.message}</p>
      <div className="mod-form-field">
          <label>password: </label>
          <input 
          type="password" 
          name="password" 
          onChange={onChangeField} 
          />
      </div>
      <p>{errors && errors.password && errors.password.message}</p>
      <p>{message}</p>
      <button onClick={onLogin}>submit</button><span> or </span>
      <Link to="/register">go to register</Link>
    </form>
  );
}

export default Login;
