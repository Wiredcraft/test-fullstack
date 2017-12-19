import React, { Component } from 'react'

class LightingTalkItem extends Component {
  render() {
    const { data, voteHandler, index } = this.props
    return (
      <div className='lighting-talk-item flex verticle-center horizontal-justfy'>
        <span>
          <div><strong>{data.username}</strong>: {data.description}</div>
          <div className='username'>{data.username}</div>
        </span>
        <span>
          <div className={data.isVoted ? 'font-red' : ''}><i onClick={() => voteHandler(index)} className='fa fa-flag-o fa-2x'/> <storng>{data.voteCount}</storng></div>
        </span>
      </div>
    )
  }
}

export default LightingTalkItem