import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import './TalkItem.css'

const TalkItem = ({talk, onVote}) => {
  const {author, title, description, votes, voted, publishDate, isPublic} = talk
  return (
    <div className="TalkItem">
      <div className="TalkItem-header">
        <h3 className="TalkItem-title">{title}</h3>
        (by {author})
      </div>
      <p className="TalkItem-description">{description}</p>
      <div className="TalkItem-footer">
        {voted ?
          'voted, ' :
          <button
            className="TalkItem-vote"
            type="button"
            onClick={onVote}
          >
            vote for it!
          </button>
        }
        <span>{votes} votes,&nbsp;</span>
        <span className="TalkItem-created">publish {moment(publishDate).fromNow()}</span>
        <span>, {isPublic ? 'public' : 'private'}</span>
      </div>
    </div>
  )
}

TalkItem.propTypes = {
  talk: PropTypes.object.isRequired,
  onVote: PropTypes.func.isRequired,
}

export default TalkItem
