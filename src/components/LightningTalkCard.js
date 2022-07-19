import React from 'react'
import {
  Title,
  Paragraph,
  SecondaryParagraph,
  UpvoteButton,
  Spacing,
} from 'components'

export default function LightningTalkCard({
  title,
  description,
  numberOfVotes,
  speaker,
  date,
  onVote,
}) {
  return (
    <div className="lightning-talk-card-container">
      <div>
        <div>
          <Title text={title} />
          <Spacing space="md" />
          <Paragraph text={description} />
        </div>
        <UpvoteButton numberOfVotes={numberOfVotes} onClick={onVote} />
      </div>
      <Spacing space="md" />
      <SecondaryParagraph text={`${speaker} | ${date}`} />
    </div>
  )
}
