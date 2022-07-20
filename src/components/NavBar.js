import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton, UnstyledButton } from 'components'
import { getCurrentAuthenticatedUser } from 'utility'
import CONSTANTS from 'constants'

export default function NavBar() {
  const navigate = useNavigate()
  const { ROUTES_NAMES } = CONSTANTS

  async function navigateToPublishNewPollPage() {
    const user = await getCurrentAuthenticatedUser()

    if (user) navigate(ROUTES_NAMES?.PUBLISH_NEW_POLL)
    else navigate(ROUTES_NAMES?.SIGN_IN)
  }

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
        onClick={() => navigateToPublishNewPollPage()}
      />
    </div>
  )
}
