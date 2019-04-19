import React, { useState, useContext } from 'react';
import { navigate } from "@reach/router"

import MaxLengthText from '../components/MaxLengthText';
import config from '../utils/config';
import UserContext from '../components/UserContext';

const NewTalk = () => {

  const [ title, setTitle ] = useState('');
  const [ abstract, setAbstract ] = useState('');

  const { user } = useContext(UserContext);

  const submit = async e => {
    e.preventDefault();

    await fetch(`${config.apiHost}/talks`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + user,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        abstract
      })
    });

    navigate(`${process.env.PUBLIC_URL}/`);
  };

  return (
    <form action='#' onSubmit={submit} className='body-container'>
      <h2>New Talk</h2>
      <MaxLengthText getSet={[ title, setTitle ]} label='Title' maxLength={50} />
      <MaxLengthText getSet={[ abstract, setAbstract ]} label='Abstract' maxLength={250} multiline />
      <div className='field-group'>
        <button type='submit'>Create</button>
      </div>
    </form>
  );
}

export default NewTalk;
