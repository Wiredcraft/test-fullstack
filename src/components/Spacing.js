import React from 'react'
import CONSTANTS from 'constants'

export default function Spacing({ space }) {
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
