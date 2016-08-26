import React, { PropTypes } from 'react';

import Icon from './Icon';

// eslint-disable-next-line max-len
const Talk = ({ vote, title, id, cover, speaker, description, submitter, createdAt, upvote, voted }) => {
  let voteButtonClass = 'talk__vote';
  if (voted) voteButtonClass += ' voted';
  return (
    <div className="talk">
      <div className="talk__wrapper">
        <div className="talk__cover">
          <img src={cover} alt="cover" />
        </div>
        <div className="talk__header">
          <span className="talk__title">{title}</span>
          <span> - </span>
          <span className="talk__speaker">
          {speaker}
          </span>
        </div>
        <div className="talk__description">
          {description}
        </div>
      </div>
      <div className="talk__footer">
        {`by ${submitter}, ${createdAt}`}
      </div>
      <button className={voteButtonClass} onClick={() => vote(id)} >
        <Icon name="up" />
        <div>{upvote}</div>
      </button>
    </div>
  );
};

Talk.propTypes = {
  vote: PropTypes.func,
  title: PropTypes.string,
  id: PropTypes.number,
  cover: PropTypes.string,
  speaker: PropTypes.string,
  description: PropTypes.string,
  submitter: PropTypes.string,
  createdAt: PropTypes.string,
  upvote: PropTypes.number,
  voted: PropTypes.bool,
};

export default Talk;
