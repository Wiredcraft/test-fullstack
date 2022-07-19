import React from 'react'
import { SecondaryParagraph, Spacing } from 'components'
import CONSTANTS from 'constants'

export default function Footer() {
  return (
    <div className="footer-container">
      <div>
        <img className="footer-logo" src={CONSTANTS?.LOGO_URL} alt="Logo" />
        <Spacing space="lg" />
        <SecondaryParagraph text="&copy; All rights reserved" />
      </div>
    </div>
  )
}
