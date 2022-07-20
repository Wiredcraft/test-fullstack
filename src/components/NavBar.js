import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { PrimaryButton } from 'components'
import { getCurrentAuthenticatedUser, signOut } from 'utility'
import CONSTANTS from 'constants'

export default function NavBar() {
  const [user, setUser] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { ROUTES_NAMES } = CONSTANTS

  useEffect(() => {
    async function getUser() {
      const user = await getCurrentAuthenticatedUser()
      if (user) setUser(user)
    }

    getUser()
  }, [location])

  async function navigateToPublishNewPollPage() {
    if (user) navigate(ROUTES_NAMES?.PUBLISH_NEW_POLL)
    else navigate(ROUTES_NAMES?.SIGN_IN)
  }

  async function handleSignIn() {
    if (user) await signOut()
    navigate(ROUTES_NAMES?.SIGN_IN)
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

      <div>
        <img
          className="navbar-sign-in-button"
          src={
            user
              ? CONSTANTS?.SIGN_OUT_OUT_ICON_URL
              : CONSTANTS?.SIGN_IN_ICON_URL
          }
          alt="Sign In"
          onClick={() => handleSignIn()}
          aria-hidden="true"
        />

        <PrimaryButton
          text="Publish"
          onClick={() => navigateToPublishNewPollPage()}
        />
      </div>
    </div>
  )
}
