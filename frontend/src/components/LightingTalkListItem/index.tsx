import React, { useEffect, useState } from 'react';
import { LightingTalk } from '../../models';
import './index.scss';
import iconLike from '../../assets/images/like.png';
import { uiStore } from '../../stores';
import { observer } from 'mobx-react-lite';

type Props = {
  index: number;
  item: LightingTalk;
  onVote?: (item: LightingTalk) => void;
  onShowDetail?: (item: LightingTalk) => void;
};

const LightingTalkListItem: React.FC<Props> = observer((props) => {
  const onVote = () => {
    props.onVote?.call(this, props.item);
  };

  const onShowDetail = () => {
    props.onShowDetail?.call(this, props.item);
  };

  return (
    <div className="lighting-talk-list-item">
      <h3>
        <span>
          {props.index + 1}. {props.item.topic}
        </span>
        {uiStore.hasLogined ? (
          <a className="lighting-talk-list-item__vote" onClick={onVote}>
            <img className="checked" src={iconLike} /> {props.item.rating}
          </a>
        ) : (
          <span>Rating: {props.item.rating}</span>
        )}
      </h3>
      <div className="lighting-talk-list-item__body">
        <a className="lighting-talk-list-item__more" onClick={onShowDetail}>
          {props.item.showContent ? 'Hide detail' : 'Show detail'}
        </a>
        <span className="lighting-talk-list-item__update-at">Last update at: {props.item.formatUpdatedAt}</span>
      </div>
      {props.item.showContent && <p>{props.item.content}</p>}
    </div>
  );
});

export default LightingTalkListItem;
