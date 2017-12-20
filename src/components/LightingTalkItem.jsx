import React, { Component } from 'react'

const LightingTalkItem = (props) => {
  const { data, voteHandler, index } = props
  return (
    <div className='lighting-talk-item flex verticle-center horizontal-justfy' onClick={() => voteHandler(index)}>
      <span>
        <div><strong>{data.username}</strong>: {data.description}</div>
        <div className='username'>{data.username}</div>
      </span>
      <span>
        <div className={data.isVoted ? 'font-red' : ''}>
          <i className='vote-icon'/>
          <b>{data.voteCount}</b>
        </div>
      </span>
    </div>
  )
}

export default LightingTalkItem