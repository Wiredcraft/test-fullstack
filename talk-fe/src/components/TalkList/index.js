import React from 'react';
import Talk from '../Talk';
import './index.scss';

export default function TalkList({ talks, actions }) {
  if (talks.length === 0) {
    return (
      <div className="talkList">
        <span>no talk, please submit some </span>
      </div>
    );
  }
  return (
    <div className="talkList">
      {talks.map((_, index) => (
        <Talk key={_.id} talk={_} actions={actions} order={index} />
      ))}
    </div>
  );
}
