import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import UserContext from './UserContext';
import fireModal from './fireModal';

const Talk = ({ clickHandler, votes, title, abstract, id, active }) => {

  const { user } = useContext(UserContext);

  const vote = async val => {
    if (!user) {
      fireModal('notLoggedIn', {actionName: 'vote'});
    } else {
      try {
        const res = await fetch('https://fake-url');
        console.log(val);
      } catch(e) {
        fireModal('networkError');
      }
    }
  }

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
                    onClick={() => vote(+1)}
                  />
                  <FontAwesomeIcon
                    className='vote-btn downvote'
                    icon='thumbs-down'
                    role='button'
                    aria-label='downvote'
                    title='downvote'
                    onClick={() => vote(-1)}
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
