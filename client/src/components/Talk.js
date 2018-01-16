import React from 'react'
import '../assets/sass/Talk.css'

const Talk = (props) =>
  <div className='c-Talk'>
    <div className='c-Talk__rating'>
      <span>{props.talk.rating}</span>
      <button
        className='c-Talk__btn'
        onClick={props.onUpvoteClick.bind(this, props.talk.id)}
      >
      </button>
    </div>
    <div>
      <span>{props.talk.title}</span>
      <span className='c-Talk__desc'>{props.talk.desc}</span>
      <span className='c-Talk__user'>by {props.talk.user}</span>
    </div>
  </div>
    

export default Talk;
