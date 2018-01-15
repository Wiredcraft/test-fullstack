import React from 'react';

const Talk = (props) =>
  <div>
    <p>{props.talk.title}</p>
    <p>{props.talk.desc}</p>
    <p>{props.talk.user}</p>
    <p>{props.talk.rating}</p>
    <button onClick={props.onUpvoteClick.bind(this, props.talk.id)}>
      Upvote
    </button>
  </div>
    

export default Talk;
