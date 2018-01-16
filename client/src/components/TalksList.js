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
    ) : null}
  </div>

export default TalksList;
