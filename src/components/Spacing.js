import CONSTANTS from 'constants'
import PropTypes from 'prop-types'
import React from 'react'

function Spacing({ space }) {
  function getSpace() {
    switch (space) {
      case 'sm':
        return CONSTANTS.SPACING.SM
      case 'md':
        return CONSTANTS.SPACING.MD
      case 'lg':
        return CONSTANTS.SPACING.LG
      case 'xl':
        return CONSTANTS.SPACING.XL
      default:
        return CONSTANTS.SPACING.SM
    }
  }
  return (
    <div
      style={{
        padding: getSpace(),
      }}
    />
  )
}

Spacing.propTypes = {
  space: PropTypes.string,
}

export default Spacing
