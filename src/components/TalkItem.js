import React from 'react'
import './TalkItem.css'

const TalkItem = ({talk, onVote}) => {
  const {author, title, description, votes} = talk
  return (
    <div className="TalkItem">
      <div className="TalkItem-header">
        <h3 className="TalkItem-title">{title}</h3>
        (by {author})
      </div>
      <p className="TalkItem-description">{description}</p>
      <div className="TalkItem-footer">
        <button
          className="TalkItem-vote"
          type="button"
          onClick={onVote}
        >
          vote for it!
        </button>
        <span>{votes} votes</span>
      </div>
    </div>
  )
}

export default TalkItem
