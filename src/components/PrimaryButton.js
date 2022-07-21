import { Loader } from 'components'
import PropTypes from 'prop-types'
import React from 'react'

function PrimaryButton({ text, isLoading, onClick }) {
  return (
    <button type="button" className="primary-button" onClick={onClick}>
      {isLoading ? <Loader /> : text}
    </button>
  )
}

PrimaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default PrimaryButton
