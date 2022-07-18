import React from 'react'
import { NavBar, Footer } from 'components'
import { Outlet } from 'react-router-dom'

export default function Template() {
  return (
    <div className="template">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}
