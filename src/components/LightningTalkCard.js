import {
  Paragraph,
  SecondaryParagraph,
  Spacing,
  Title,
  UpvoteButton,
} from 'components'

import PropTypes from 'prop-types'
import React from 'react'
import { formatDistanceToNow } from 'date-fns'

function LightningTalkCard({
  lightningTalkPollID,
  title,
  description,
  numberOfVotes,
  speaker,
  date,
  isLoading,
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

LightningTalkCard.propTypes = {
  lightningTalkPollID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  numberOfVotes: PropTypes.number.isRequired,
  speaker: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onVote: PropTypes.func.isRequired,
}

export default LightningTalkCard
