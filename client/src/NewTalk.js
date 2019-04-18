import React, { useState } from 'react';
import MaxLengthText from './MaxLengthText';

const NewTalk = () => {

  const [ title, setTitle ] = useState('');
  const [ abstract, setAbstract ] = useState('');

  const submit = async e => {
    e.preventDefault();
    // console.log(title, abstract);

    const res = await fetch('http://localhost:5000');

    console.log(res);
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
