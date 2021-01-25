import React from 'react';
import { useDispatch } from 'react-redux';

// Styles
import { PollTitle, PollMeta, PollMetaElement } from '../../../scss/poll';

// Actions
import { mapTime } from '../../../core/helpers';
import { pollActions } from '../../../core/polls';

const Item = ({ item, updatePollVote }) => {
  const dispatch = useDispatch();

  return (
    <li>
      <button onClick={() => dispatch(pollActions.updatePollVote(item._id))}> Vote {item.votes} </button>
      <PollTitle>{item.title}</PollTitle>
      <PollMeta>
        <PollMetaElement>By: {item.name}</PollMetaElement>
        <PollMetaElement>{mapTime(item.date_created)}</PollMetaElement>
      </PollMeta>
    </li>
  );
};

export default Item;

// React Memo