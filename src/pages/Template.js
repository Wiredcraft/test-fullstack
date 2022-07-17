import React from 'react'
import { PrimaryButton } from 'components'
import { Outlet, Link } from 'react-router-dom'

export default function Template() {
  return (
    <div>
      <h1>Template</h1>
      <PrimaryButton />
      <Link to="/">Home</Link>
      <Link to="/sign-up">Sign Up</Link>
      <Outlet />
    </div>
  )
}
