import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../assets/sass/Form.css'

const Form = (props) => {
  const error = (field) => {
    return (
      !props.values[field] && props.error ?
      <p className='c-Form__error-msg'>This field is required</p> :
      null
    )
  }
  const inputClass = (field) => 
    `c-Form__input${!props.values[field] && props.error ? ' c-Form__input_error' : ''}`

  return (
      <div className='c-Form'>
        <div className='c-Form__container'>
          <h2 className='c-Form__title'>Add a new talk!</h2>
          <form>
            <label className='c-Form__label'>talk title</label>
            <div>
              <input
                className={inputClass('title')}
                value={props.values.title}
                onChange={props.onChange.bind(this, 'title')}
              />
            </div>
            {error('title')}
            <label className='c-Form__label'>publish date</label>
            <div>
              <DatePicker
                className={inputClass('publish')}
                selected={props.values.publish}
                onChange={props.onDateChange}
              />
            </div>
            {error('publish')}
            <label className='c-Form__label'>talk description</label>
            <div>
              <textarea
                className={inputClass('desc')}
                rows='3'
                value={props.values.desc}
                onChange={props.onChange.bind(this, 'desc')}
              />
            </div>
            {error('desc')}
            <label className='c-Form__label'>author</label>
            <div>
              <input
                className={inputClass('user')}
                value={props.values.user}
                onChange={props.onChange.bind(this, 'user')}
              />
            </div>
            {error('user')}
            <label className='c-Form__label'>public</label>
            <div className='c-Form__input-container'>
              <select
                className={inputClass('public')}
                value={props.values.public}
                onChange={props.onChange.bind(this, 'public')}
              >
                <option className='c-Form__empty-option' disabled value=''></option>
                <option value='public'>public</option>
                <option value='private'>private</option>
              </select>
              <span className='c-Form__arrow' role='img'>▾</span>
            </div>
            {error('public')}
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
      </div>
    )
}

export default Form;
