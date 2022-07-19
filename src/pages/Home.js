import React from 'react'
import { PrimaryButton, PageTitle, UpvoteButton } from 'components'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <PageTitle title="Home" />
      <UpvoteButton />
      <h1>Home</h1>
    </div>
  )
}
