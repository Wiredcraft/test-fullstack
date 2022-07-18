import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from 'components'
import CONSTANTS from 'constants'

export default function NavBar() {
  const navigate = useNavigate()

  return (
    <div className="navbar-container">
      <img className="navbar-logo" src={CONSTANTS?.LOGO_URL} alt="Logo" />

      <PrimaryButton
        text="Publish"
        onClick={() => navigate('publish-new-poll')}
      />
    </div>
  )
}
