import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { pollActions } from '../../../core/polls';

const Item = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <li>
      <button onClick={() => dispatch(pollActions.updatePollVote(item._id))}> Vote {item.votes} </button>
      <h5>Topics Title</h5>
      <p>
        <span>By: Authors name</span>
        <span>{moment(item.date_created).fromNow()}</span>
      </p>
    </li>
  );
};

export default Item;

// React Memo