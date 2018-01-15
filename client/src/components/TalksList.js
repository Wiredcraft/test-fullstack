import React from 'react';
import Talk from './Talk'

const TalksList = (props) => 
  props.talks ?
  props.talks.map((talk, i) => (
      <Talk
        key={i}
        talk={talk}
        onUpvoteClick={props.onUpvoteClick}
      />
    )
  ) : null

export default TalksList;
