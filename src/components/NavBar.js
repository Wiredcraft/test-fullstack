import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from 'components'
import CONSTANTS from 'constants'

export default function NavBar() {
  const navigate = useNavigate()
  const { ROUTES_NAMES } = CONSTANTS

  return (
    <div className="navbar-container">
      <img
        className="navbar-logo"
        src={CONSTANTS?.LOGO_URL}
        alt="Logo"
        onClick={() => navigate(ROUTES_NAMES?.HOME)}
        aria-hidden="true"
      />

      <PrimaryButton
        text="Publish"
        onClick={() => navigate(ROUTES_NAMES?.PUBLISH_NEW_POLL)}
      />
    </div>
  )
}
