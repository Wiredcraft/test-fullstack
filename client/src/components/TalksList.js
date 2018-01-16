import React from 'react';
import Talk from './Talk'
import '../assets/sass/TalksList.css';

const TalksList = (props) => 
  <div className='c-TalksList'>
    {props.talks ?
    props.talks.sort((a,b) => b.rating - a.rating).map((talk, i) => (
        <Talk
          key={i}
          talk={talk}
          onUpvoteClick={props.onUpvoteClick}
        />
      )
    ) :
    <p>There is no talk yet! Add one!</p>}
  </div>

export default TalksList;
