import React from 'react';
import '../assets/sass/Form.css'

const Form = (props) =>
  <div className='c-Form'> 
    <h2 className='c-Form__title'>Add a new talk!</h2>
    <form>
      <label className='c-Form__label'>user</label>
      <input
        className='c-Form__input'
        onChange={props.onChange.bind(this, 'user')}
      />
      <label className='c-Form__label'>talk title</label>
      <textarea 
        rows='3'
        className='c-Form__input'
        onChange={props.onChange.bind(this, 'title')}
      />
      <label className='c-Form__label'>talk description</label>
      <textarea
        rows='3'
        className='c-Form__input'
        onChange={props.onChange.bind(this, 'desc')}
      />
    </form>
    <div className='c-Form__btn-container'>
      <button
        className='c-btn c-Form__btn'
        onClick={props.onSubmit}
      >
        submit
      </button>
    </div>
  </div>

export default Form;
