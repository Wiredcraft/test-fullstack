import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import StarIcon from '../icons/star';

import './LightningCard.scss';
import { ITalk } from '../../store/modules/talks/talks.types';
import { useAppDispatch, useAppSelector } from '../../store';
import { vote } from '../../store/modules/talks/talks.api';
import UserIcon from '../icons/user';
import ClockIcon from '../icons/clock';
import { toast } from './ToastManager';
import Spinner from './Spinner';

type Props = ITalk;

type State = {
  checked: boolean;
};

export default function LightningCard(props: ITalk) {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const userVoteIds = useAppSelector((state) => state.user.user.voteTalkIds);

  const [checkedState, setCheckedState] = useState(false);
  const [voteLoading, setVoteLoading] = useState(false);

  let cardClass = classNames('l-card', 'py-4', 'my-8', {
    voted: checkedState
  });

  let buttonClass = classNames('left', 'px-10', 'relative', {
    checked: checkedState,
    'not-allowed': voteLoading
  });

  useEffect(() => {
    setCheckedState(userVoteIds.includes(props.id));
  }, [userVoteIds]);

  const clickVote = () => {
    if (loggedIn) {
      if (!voteLoading) {
        setVoteLoading(true);
        dispatch(vote(props.id)).then(() => {
          setVoteLoading(false);
        });
      }
    } else {
      toast.show({
        title: 'Login Required',
        content: 'You must first login before you are able to vote.',
        type: 'error',
        duration: 3000
      });
    }
  };

  let starElement;

  if (voteLoading) {
    starElement = (
      <div className="relative my-6">
        <Spinner large={false} />
      </div>
    );
  } else {
    starElement = <StarIcon fillColor="none" size={48} />;
  }

  const formattedTime = DateTime.fromISO(props.createdAt).toLocaleString(DateTime.DATETIME_SHORT);

  return (
    <div className={cardClass}>
      <button onClick={clickVote} type="button" className={buttonClass}>
        {starElement}
        <span className="text-xl">{props.voteCount}</span>
      </button>
      <div className="center pr-4">
        <div className="content">
          <div className="title text-2xl text-bold text-blue">{props.title}</div>
          <div className="desc text-lg">{props.description}</div>
        </div>
        <div className="info py-2 text-gray flex items-center justify-start text-md">
          <UserIcon size={18} />
          <span className="user ml-1 mr-2">{props.userName}</span>
          <ClockIcon size={18} />
          <span className="created ml-1 mr-2">{formattedTime}</span>
        </div>
      </div>
    </div>
  );
}
