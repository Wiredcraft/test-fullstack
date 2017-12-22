import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { dangerousHTML } from '../helper'

const LightingTalkItem = (props) => {
  const { data, voteHandler, index } = props
  return (
    <div className='lighting-talk-item flex verticle-center horizontal-justfy' onClick={() => voteHandler(index)}>
      <span>
        <div>
          <b><span dangerouslySetInnerHTML={dangerousHTML(data.title)}/>:</b> &nbsp;
          <span dangerouslySetInnerHTML={dangerousHTML(data.description)}/>
        </div>
        <div className='username'>
          <span dangerouslySetInnerHTML={dangerousHTML(data.author)} />
          | <span>{data.publishDate[0].toDateString()}</span>
          | <span>{data.public ? 'Public' : null}</span>

        </div>
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

LightingTalkItem.propTypes = {
  data: PropTypes.object.isRequired
}

export default LightingTalkItem