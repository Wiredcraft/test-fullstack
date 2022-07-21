import React, { useEffect, useState } from 'react'
import { getCurrentAuthenticatedUser, signOut } from 'utility'
import { useLocation, useNavigate } from 'react-router-dom'

import CONSTANTS from 'constants'
import { PrimaryButton } from 'components'

export default function NavBar() {
  const [user, setUser] = useState(false)
  const [shouldNavbarButtons, setShouldHideSignInButton] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { ROUTES_NAMES } = CONSTANTS

  useEffect(() => {
    async function getUser() {
      const user = await getCurrentAuthenticatedUser()
      if (user) setUser(user)

      if (location.pathname === ROUTES_NAMES.HOME)
        setShouldHideSignInButton(false)
      else setShouldHideSignInButton(true)
    }

    getUser()
  }, [location])

  async function navigateToPublishNewPollPage() {
    if (user) navigate(ROUTES_NAMES?.PUBLISH_NEW_POLL)
    else navigate(ROUTES_NAMES?.SIGN_IN)
  }

  async function handleSignIn() {
    if (user) {
      await signOut()
      setUser(false)
    }
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
        {!shouldNavbarButtons && (
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
        )}

        {!shouldNavbarButtons && (
          <PrimaryButton
            text="Publish"
            onClick={() => navigateToPublishNewPollPage()}
          />
        )}
      </div>
    </div>
  )
}
