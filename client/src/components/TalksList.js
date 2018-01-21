import React from 'react';
import Talk from './Talk'
import '../assets/sass/TalksList.css';

const TalksList = (props) => 
  <div className='c-TalksList'>
    {props.talks &&  props.talks.length > 0 ?
    props.talks.sort((a,b) => b.rating - a.rating).map((talk, i) => (
        <Talk
          key={i}
          talk={talk}
          onUpvoteClick={props.onUpvoteClick}
          upvoted={props.upvoted}
        />
      )
    ) :
    <p className='c-TalksList__placeholder'>There is no talks yet! Add one!</p>}
  </div>

export default TalksList;
