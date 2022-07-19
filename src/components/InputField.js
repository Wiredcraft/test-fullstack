import React from 'react'
import { Paragraph, ErrorText, Spacing } from 'components'

export default function InputField({ type, label, placeholder, errorMessage }) {
  return (
    <div className="input-field-container">
      <div>
        <Paragraph text={label} />
        <Spacing />
        <input className="input-field" type={type} placeholder={placeholder} />
        <Spacing />
        <ErrorText text={errorMessage} />
      </div>
    </div>
  )
}
