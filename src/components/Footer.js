import React from 'react'
import { SecondaryParagraph, Spacing } from 'components'
import CONSTANTS from 'constants'

export default function Footer() {
  return (
    <div className="footer-container">
      <div>
        <Spacing space="md" />
        <img className="footer-logo" src={CONSTANTS?.LOGO_URL} alt="Logo" />
        <Spacing space="md" />
        <SecondaryParagraph text="&copy; All rights reserved" />
      </div>
    </div>
  )
}
