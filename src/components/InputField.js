import { ErrorText, Paragraph, Spacing } from 'components'

import PropTypes from 'prop-types'
import React from 'react'

function InputField({
  id,
  type,
  label,
  placeholder,
  errors,
  errorMessage,
  register,
  disabled,
}) {
  return (
    <div className="input-field-container">
      <div>
        <Paragraph text={label} />
        <Spacing />
        <input
          id={id}
          className="input-field"
          type={type}
          placeholder={placeholder}
          {...register}
          disabled={disabled}
        />
        <Spacing />
        <ErrorText text={errors?.[id] && errorMessage} />
      </div>
    </div>
  )
}

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  errorMessage: PropTypes.string.isRequired,
  register: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default InputField
