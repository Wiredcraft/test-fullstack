import PropTypes from 'prop-types'
import React from 'react'

function UnstyledButton({ text, onClick }) {
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

UnstyledButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default UnstyledButton
