import React from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

const FieldWithErr = (props) => {
  const { input, label, fieldType, meta: { touched, error } } = props
  const { name } = input
  return (
    <span>
      <div className={`field flex ${fieldType === 'checkbox' ? 'verticle-center' : ''}`}>
        <label>{label}</label>
        <div className='field-with-err'>
          <Field
            name={name}
            id={name}
            placeholder={label}
            component={fieldType}
            type='text' />
          {
            fieldType === 'checkbox'
              ? <input
                type='checkbox'
                name={name}
                checked={input.value}
                onChange={event => {
                  return input.onChange(event.target.checked)
                }} />
              : null
          }
          <div className='font-err'>{touched && error ? <div>{error}</div> : null}</div>
        </div>
      </div>
    </span>
  )
}

FieldWithErr.propTypes = {
  name: PropTypes.string.isRequired,
  fieldType: PropTypes.string.isRequired,
  label: PropTypes.string
}

export default FieldWithErr