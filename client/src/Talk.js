import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import swal from 'sweetalert';

import UserContext from './UserContext';

const Talk = ({ clickHandler, votes, title, abstract, id, active }) => {

  const { user } = useContext(UserContext);

  const vote = async val => {
    if (!user) {
      swal({
        title: 'Not logged in',
        text: 'You must be logged in to vote.',
        icon: 'error'
      });
    } else {
      try {
        const res = await fetch('aa');
        console.log(val)
      } catch(e) {
        swal({
          title: 'Network error',
          text: 'A network error occurred. Please try again later.',
          icon: 'error'
        });
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
