import React from 'react';
import '../assets/sass/Talk.css';

const Talk = (props) =>
  <div className='c-Talk'>
    <div className='c-Talk__rating'>
      <span>{props.talk.rating}</span>
      <button
        onClick={props.onUpvoteClick.bind(this, props.talk.id)}
      >
        Upvote
      </button>
    </div>
    <div>
      <span>{props.talk.title}</span>
      <span>{props.talk.desc}</span>
      <span>{props.talk.user}</span>
    </div>
  </div>
    

export default Talk;
