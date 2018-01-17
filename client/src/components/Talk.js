import React from 'react'
import '../assets/sass/Talk.css'

const Talk = (props) =>
  <div className='c-Talk'>
    <div className='c-Talk__rating'>
      <span>{props.talk.rating}</span>
      {!props.upvoted || (props.upvoted && props.upvoted.filter(u => u === props.talk.id).length === 0) ?
      <button
        className='c-Talk__btn'
        onClick={props.onUpvoteClick.bind(this, props.talk.id)}
      >
      </button> :
      null}
    </div>
    <div>
      <span>{props.talk.title}</span>
      <span className='c-Talk__desc'>{props.talk.desc}</span>
      <span className='c-Talk__user'>by {props.talk.user} on {props.talk.date}</span>
    </div>
  </div>
    

export default Talk;
