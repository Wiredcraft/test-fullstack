import React from 'react'
import CONSTANTS from 'constants'

export default function Footer() {
  return (
    <div className="footer-container" type="button">
      <div>
        <img className="footer-logo" src={CONSTANTS?.LOGO_URL} alt="Logo" />
        <p>&copy; All rights reserved</p>
      </div>
    </div>
  )
}
