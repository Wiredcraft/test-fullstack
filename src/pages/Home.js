import React from 'react'
import {
  PrimaryButton,
  PageTitle,
  UpvoteButton,
  Title,
  Paragraph,
  SecondaryParagraph,
  LightningTalkCard,
} from 'components'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <PageTitle title="Home" />
      <LightningTalkCard />
    </div>
  )
}
