import React, { useEffect, useState } from 'react'
import { NavBar, PageTitle, Footer } from 'components'
import { Outlet, useLocation } from 'react-router-dom'
import { getPageTitle } from 'utility'

export default function Template() {
  const [pageTitle, setPageTitle] = useState()
  const location = useLocation()

  useEffect(() => {
    const { pathname } = location
    const title = getPageTitle(pathname)
    setPageTitle(title)
  }, [location])

  return (
    <div className="template">
      <NavBar />
      <PageTitle title={pageTitle} />
      <Outlet />
      <Footer />
    </div>
  )
}
