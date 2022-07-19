import React from 'react'

export default function UpvoteButton({ onClick, numberOfVotes }) {
  const iconUrl =
    'https://bilal-cloud.s3.ap-northeast-1.amazonaws.com/assets/icon-arrow-alt-up.svg'

  return (
    <div className="upvote-button-container">
      <div className="upvote-button-counter">
        <img
          className="upvote-button-icon"
          src={iconUrl}
          alt="Up icon"
          height={35}
        />
        <p className="upvote-button-number">{numberOfVotes || 0}</p>
      </div>
      <button className="upvote-button" type="button" onClick={onClick}>
        Upvote
      </button>
    </div>
  )
}
