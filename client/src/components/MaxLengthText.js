import React from 'react';

const MaxLengthText = ({ label, maxLength, multiline, getSet }) => {
  const id = `form-field-${label.toLowerCase().replace(/[^a-z]/g, '-')}`;

  const [ val, setVal ] = getSet;

  const updateVal = e => {
    setVal(e.currentTarget.value);
  };

  return (
    <div className='field-group'>
      <label htmlFor={id}>{label}</label>
      {
        multiline
          ? <textarea id={id} onChange={updateVal} maxLength={maxLength} />
          : <input id={id} onChange={updateVal} type='text' maxLength={maxLength} />
      }
      <div className='char-countdown'>
        {val.length}/{maxLength} chars
      </div>
    </div>
  );
}

export default MaxLengthText;
