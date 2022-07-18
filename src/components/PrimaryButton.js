import React from 'react'

export default function PrimaryButton({ text, onClick }) {
  return (
    <button type="button" className="primary-button" onClick={onClick}>
      {text}
    </button>
  )
}
