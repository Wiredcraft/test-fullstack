import PropTypes from 'prop-types'
import React from 'react'

function ErrorText({ text }) {
  return <p className="error-text">{text}</p>
}

ErrorText.propTypes = {
  text: PropTypes.string.isRequired,
}

export default ErrorText
