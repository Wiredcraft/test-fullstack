import React from 'react';
import moment from 'moment';
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
      <PollTitle>Topics Title</PollTitle>
      <PollMeta>
        <PollMetaElement>By: Authors name</PollMetaElement>
        <PollMetaElement>{mapTime(item.date_created)}</PollMetaElement>
      </PollMeta>
    </li>
  );
};

export default Item;

// React Memo