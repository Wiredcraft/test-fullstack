import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from 'components'

export default function NavBar() {
  const navigate = useNavigate()
  const logoUrl =
    'https://bilal-cloud.s3.ap-northeast-1.amazonaws.com/assets/logo-black.svg'

  return (
    <div className="navbar-container">
      <img className="navbar-logo" src={logoUrl} alt="Logo" />

      <PrimaryButton
        text="Publish"
        onClick={() => navigate('publish-new-poll')}
      />
    </div>
  )
}
