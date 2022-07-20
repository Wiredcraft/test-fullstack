import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import {
  Title,
  Paragraph,
  SecondaryParagraph,
  UpvoteButton,
  Spacing,
} from 'components'

export default function LightningTalkCard({
  lightningTalkPollID,
  title,
  description,
  numberOfVotes,
  speaker,
  date,
  onVote,
  isLoading,
}) {
  return (
    <div className="lightning-talk-card-container">
      <div>
        <div>
          <Title text={title} />
          <Spacing space="md" />
          <Paragraph text={description} />
        </div>
        <div>
          <UpvoteButton
            lightningTalkPollID={lightningTalkPollID}
            numberOfVotes={numberOfVotes}
            onClick={onVote}
            isLoading={isLoading}
          />
        </div>
      </div>
      <Spacing space="md" />
      <SecondaryParagraph
        text={`By ${speaker} | ${formatDistanceToNow(new Date(date), {
          addSuffix: true,
        })}`}
      />
    </div>
  )
}
