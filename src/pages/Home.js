import React from 'react'
import {
  PrimaryButton,
  PageTitle,
  UpvoteButton,
  Title,
  Paragraph,
  SecondaryParagraph,
} from 'components'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <PageTitle title="Home" />
      <UpvoteButton />

      <Title text="Title" />
      <Paragraph text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took." />
      <SecondaryParagraph text="By bilal.korir | 1 hour ago" />
      <h1>Home</h1>
    </div>
  )
}
