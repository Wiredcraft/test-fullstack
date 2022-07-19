import React from 'react'
import { Paragraph, ErrorText, Spacing } from 'components'

export default function InputField({
  id,
  type,
  label,
  placeholder,
  errors,
  errorMessage,
  register,
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
        />
        <Spacing />
        <ErrorText text={errors?.[id] && errorMessage} />
      </div>
    </div>
  )
}
