import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import '../assets/sass/Form.css'

const Form = (props) => {
  const error = (field) => 
      props.errors.filter(e => e === field).length > 0 ?
      <p className='c-Form__error-msg'>This field is required</p> :
      null

  const inputClass = (field) => 
    `c-Form__input${props.errors.filter(e => e === field).length > 0 ? ' c-Form__input_error' : ''}`

  const labelClass = (field) => props.focused === field || props.values[field] ?
    'c-Form__label c-Form__label_floated' :
    'c-Form__label'

  return (
      <div className='c-Form'>
        <div className='c-Form__container'>
          <h2 className='c-Form__title'>Add a new talk!</h2>
          <form>
            <div className='c-Form__label-container'>
              <label className={labelClass('title')}>talk title</label>
              <span className='c-Form__max-length'>{60 - props.values.title.length} characters left</span>
            </div>
            <div>
              <input
                className={inputClass('title')}
                maxLength='60'
                value={props.values.title}
                onChange={props.onChange.bind(this, 'title')}
                onFocus={props.onFocus.bind(this, 'title')}
                onBlur={props.onBlur.bind(this, 'title')}
              />
            </div>
            {error('title')}
            <div className='c-Form__label-container'>
              <label className={labelClass('publish')}>publish date</label>
            </div>
            <div>
              <DatePicker
                className={inputClass('publish')}
                readOnly
                minDate={moment()}
                selected={props.values.publish}
                onChange={props.onDateChange}
                onFocus={props.onFocus.bind(this, 'publish')}
                onBlur={props.onBlur.bind(this, 'publish')}
              />
            </div>
            {error('publish')}
            <div className='c-Form__label-container'>
              <label className={labelClass('desc')}>talk description</label>
              <span className='c-Form__max-length'>{600 - props.values.desc.length} characters left</span>
            </div>
            <div>
              <textarea
                className={inputClass('desc')}
                maxLength='600'
                rows='3'
                value={props.values.desc}
                onChange={props.onChange.bind(this, 'desc')}
                onFocus={props.onFocus.bind(this, 'desc')}
                onBlur={props.onBlur.bind(this, 'desc')}
              />
            </div>
            {error('desc')}
            <div className='c-Form__label-container'>
              <label className={labelClass('user')}>author</label>
              <span className='c-Form__max-length'>{20 - props.values.user.length} characters left</span>
            </div>
            <div>
              <input
                className={inputClass('user')}
                maxLength='20'
                value={props.values.user}
                onChange={props.onChange.bind(this, 'user')}
                onFocus={props.onFocus.bind(this, 'user')}
                onBlur={props.onBlur.bind(this, 'user')}
              />
            </div>
            {error('user')}
            <div className='c-Form__label-container'>
              <label className={labelClass('public')}>public</label>
            </div>
            <div className='c-Form__input-container'>
              <select
                className={inputClass('public')}
                value={props.values.public}
                onChange={props.onChange.bind(this, 'public')}
                onFocus={props.onFocus.bind(this, 'public')}
                onBlur={props.onBlur.bind(this, 'public')}
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
