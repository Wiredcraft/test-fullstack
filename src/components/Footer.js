import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { SecondaryParagraph, Spacing, UnstyledButton } from 'components'
import CONSTANTS from 'constants'
import { signOut, getCurrentAuthenticatedUser, l } from 'utility'

export default function Footer() {
  const [user, setUser] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    async function getUser() {
      const user = await getCurrentAuthenticatedUser()
      if (user) setUser(user)
    }

    getUser()
  }, [location])

  async function handleSignOut() {
    await signOut()
    setUser(false)
    navigate(CONSTANTS?.ROUTES_NAMES?.SIGN_IN)
  }

  return (
    <div className="footer-container">
      <div>
        {user && (
          <div className="sign-out-button-container">
            <UnstyledButton text="Sign out" onClick={() => handleSignOut()} />
          </div>
        )}

        <Spacing space="md" />
        <img className="footer-logo" src={CONSTANTS?.LOGO_URL} alt="Logo" />
        <Spacing space="md" />
        <SecondaryParagraph text="&copy; All rights reserved" />
      </div>
    </div>
  )
}
