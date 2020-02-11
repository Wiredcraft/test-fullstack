import React, {useState} from 'react';
import './index.scss';

export const Poll = (props: { dataSource: any; isAdmin: any; disable: boolean; onVote: any; onDelete: any; }) => {
  const {dataSource: item, isAdmin, disable, onVote, onDelete} = props;
  return (
    <div className="mod-poll">
      <p className="mod-poll-title">{item.title}</p>
      <p className="mod-poll-desc">{item.description}</p>
      <button 
        className={`mod-poll-btn ${disable ? 'disable' : ''}`}
        onClick={disable ? null : onVote} 
        id={item._id} 
        value={item.poll}
  >voted: {item.poll || 0}, {disable ? 'please wait' : 'vote it'}</button>
      {
        isAdmin && (
          <button 
            className="mod-poll-btn" 
            onClick={onDelete} id={item._id}
          >del</button>
        )
      }
    </div>
  )
}