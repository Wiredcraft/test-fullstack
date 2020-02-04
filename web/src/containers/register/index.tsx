import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Link, useHistory } from 'react-router-dom';
import { SERVER_PATH } from '../../config';
import './index.scss';

function Register():JSX.Element {
  let history = useHistory()
  const [field, setField] = useState({userName: '', password: ''})
  const [errors, setErrors] = useState();
  const [message, setMessage] = useState();

  async function postRegister(params) {
    const res = await fetch(`${SERVER_PATH}auth/register`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    console.log(data)
    if(data.errors || data.message){
        setErrors(data.errors);
        setMessage(data.message);
      } else {
        history.push('/login');
      }
  }

  function onChangeField(e) {
    const value = e.target.value;
    const name = e.target.name;
    field[name] = value;
    setField(field);
  }

  function addUser(e) {
    postRegister(field);
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
      <button onClick={addUser}>submit</button>
    </form>
  );
}

export default Register;
