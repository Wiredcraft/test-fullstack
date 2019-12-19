import React from 'react';
import './index.scss';

export default function Talk({ talk: { id, title, description, likedCount }, order, actions: { onLike } }) {
  return (
    <div className="talk">
      <span className="index">{order + 1}.</span>
      <span className="like" onClick={onLike.bind(this, id)}>
        ❤️{likedCount}
      </span>
      <span className="title">{title}</span>
      <span className="description">{description}</span>
    </div>
  );
}
