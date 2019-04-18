import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Talk = ({ clickHandler, votes, title, abstract, id, active }) => {

  return (
    <div className={active ? 'active talk' : 'talk'} onClick={clickHandler}>
      <div>
        <div className='header-row'>
          <h3>{title}</h3>
          <div className='votes'>
            Votes: {votes.length}
            {
              active && (
                <React.Fragment>
                  <FontAwesomeIcon
                    className='vote-btn upvote'
                    icon='thumbs-up'
                    role='button'
                    aria-label='upvote'
                    title='upvote'
                  />
                  <FontAwesomeIcon
                    className='vote-btn downvote'
                    icon='thumbs-down'
                    role='button'
                    aria-label='downvote'
                    title='downvote'
                  />
                </React.Fragment>
              )
            }
          </div>
        </div>
      </div>
      {active && <p>{abstract}</p>}
    </div>
  );
}

export default Talk;
