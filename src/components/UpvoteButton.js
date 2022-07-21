import * as api from 'api'

import React, { useEffect, useState } from 'react'

import CONSTANTS from 'constants'
import { Loader } from 'components'
import PropTypes from 'prop-types'
import { getCurrentAuthenticatedUser } from 'utility'
import { isEmpty } from 'lodash'
import { useNavigate } from 'react-router-dom'

function UpvoteButton({ lightningTalkPollID, numberOfVotes, onClick }) {
  const [isLoading, setIsLoading] = useState(false)
  const [buttonText, setButtonText] = useState('Upvote')
  const navigate = useNavigate()

  useEffect(() => {
    hasUserVotedBefore()
  }, [])

  async function hasUserVotedBefore() {
    const response = await api.checkIfUserHasVotedBefore(lightningTalkPollID)

    if (response === false || isEmpty(response)) {
      setButtonText('Upvote')
      return false
    }

    if (response[0].upvote === false) {
      setButtonText('Upvote')
      return false
    }

    setButtonText('Unvote')
    return false
  }

  async function vote() {
    setIsLoading(true)
    const user = await getCurrentAuthenticatedUser()

    if (!user) {
      navigate(CONSTANTS?.ROUTES_NAMES?.SIGN_IN)
      return
    }

    const hasVoted = await hasUserVotedBefore()

    if (!hasVoted) {
      await onClick()
      if (buttonText === 'Upvote') setButtonText('Unvote')
      else setButtonText('Upvote')
    }
    setIsLoading(false)
  }

  return (
    <div className="upvote-button-container">
      <div className="upvote-button-counter">
        <img
          className="upvote-button-icon"
          src={CONSTANTS?.RED_ARROW_ICON_URL}
          alt="Upvote icon"
          height={35}
        />
        <p className="upvote-button-number">{numberOfVotes || 0}</p>
      </div>
      <button className="upvote-button" type="button" onClick={() => vote()}>
        {isLoading ? <Loader /> : buttonText}
      </button>
    </div>
  )
}

UpvoteButton.propTypes = {
  lightningTalkPollID: PropTypes.string.isRequired,
  numberOfVotes: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default UpvoteButton
