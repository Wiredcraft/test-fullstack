import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import fetch from 'isomorphic-unfetch';
import _ from 'lodash';
import { SERVER_PATH } from '../../config';

function EditPoll():JSX.Element {
  let history = useHistory()
  const [field, setField] = useState({title: '', description: ''})
  const [data, setData] = useState({title: '', description: ''})
  const [errors, setErrors] = useState();
  const [message, setMessage] = useState();
  const { pollId } = useParams();

  useEffect(() => {
    
  }, []);

  async function postPoll(params) {
    const token = sessionStorage.getItem('token');
    if(!token){
      history.push('/login');
    }
    try {
      const res = await fetch(`${SERVER_PATH}polls`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(params),
      });
      const data = await res.json();
      if(data.errors || data.message){
        setErrors(data.errors);
        setMessage(data.message);
        if(data.message === 'please login'){
          history.push('/login');
        }
      } else {
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

  function addPoll(e) {
    postPoll(field);
    e.preventDefault();
  }

  return (
    <form className="mod-form">
      <h3>{pollId ? 'edit one poll' : 'create a poll'}</h3>
      <div className="mod-form-field">
        <label>title</label>
        <input 
          type="text" 
          name="title" 
          onChange={onChangeField}
        />
      </div>
      <p>{errors && errors.title && errors.title.message}</p>
      <div className="mod-form-field">
        <label>description</label>
          <input 
            type="text" 
            name="description" 
            onChange={onChangeField} 
          />
      </div>
      <p>{errors && errors.description && errors.description.message}</p>
      <p>{message}</p>
      <button onClick={addPoll}>submit</button>
    </form>
  )
}

export default EditPoll;
