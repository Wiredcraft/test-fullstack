import React from 'react'

export default function UnstyledButton({ text, onClick }) {
  return (
    <div className="unstyled-button-container">
      <div>
        <button type="button" className="unstyled-button" onClick={onClick}>
          {text}
        </button>
      </div>
    </div>
  )
}
