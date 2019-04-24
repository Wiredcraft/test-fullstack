import React, { useState, useContext } from 'react';
import { navigate } from "@reach/router"

import MaxLengthText from '../components/MaxLengthText';
import config from '../utils/config';
import UserContext from '../components/UserContext';
import Title from '../components/Title';

import { fireModal, NETWORK_ERROR } from '../utils/fireModal';
import  { LOADING, LOADED, ERROR } from '../utils/loadingStatuses';

const NewTalk = () => {

  const [ title, setTitle ] = useState('');
  const [ abstract, setAbstract ] = useState('');
  const [ status, setStatus ] = useState(LOADED);

  const { user } = useContext(UserContext);

  const submit = async e => {
    e.preventDefault();

    try {
      setStatus(LOADING);

      const res = await fetch(`${config.apiHost}/talks`, {
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

      if (res.status === 200) {
        navigate(`${process.env.PUBLIC_URL}/`);
      } else {
        fireModal(NETWORK_ERROR);
        setStatus(ERROR);
      }

    } catch(e) {
      fireModal(NETWORK_ERROR);
      setStatus(ERROR);
    }

  };

  const cancel = () => navigate(`${process.env.PUBLIC_URL}/`);

  return (
    <form action='#' onSubmit={submit} className={`form body-container${status === LOADING ? ' loading' : ''}`}>
      <Title text='New Talk' />
      <h2>New Talk</h2>
      <fieldset disabled={status === LOADING}>
        <MaxLengthText getSet={[ title, setTitle ]} label='Title' maxLength={50} />
        <MaxLengthText getSet={[ abstract, setAbstract ]} label='Abstract' maxLength={250} multiline />
      </fieldset>
      <div className='button-group'>
        <button disabled={status === LOADING} className='submit-btn' type='submit'>Create</button>
        <button disabled={status === LOADING} onClick={cancel} className='cancel-btn' type='button'>Cancel</button>
      </div>
    </form>
  );
}

export default NewTalk;
