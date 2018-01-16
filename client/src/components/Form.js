import React from 'react';
import '../assets/sass/Form.css'

const Form = (props) =>
  <div className='c-Form'> 
    <h2 className='c-Form__title'>Add a new talk!</h2>
    <form>
      <label className='c-Form__label'>user</label>
      {!props.values.user && props.error ?
      <p className='c-Form__error-msg'>This field is required</p> :
      null}
      <input
        className={`c-Form__input${!props.values.user && props.error ? ' c-Form__input_error' : ''}`}
        value={props.values.user}
        onChange={props.onChange.bind(this, 'user')}
      />
      <label className='c-Form__label'>talk title</label>
      {!props.values.title && props.error ?
      <p className='c-Form__error-msg'>This field is required</p> :
      null}
      <textarea 
        rows='3'
        className={`c-Form__input${!props.values.title && props.error ? ' c-Form__input_error' : ''}`}
        value={props.values.title}
        onChange={props.onChange.bind(this, 'title')}
      />
      <label className='c-Form__label'>talk description</label>
      {!props.values.desc && props.error ?
      <p className='c-Form__error-msg'>This field is required</p> :
      null}
      <textarea
        rows='3'
        className={`c-Form__input${!props.values.desc && props.error ? ' c-Form__input_error' : ''}`}
        value={props.values.desc}
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
