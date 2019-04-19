import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import UserContext from '../components/UserContext';
import config from '../utils/config';
import fireModal from '../utils/fireModal';

const Talk = ({ shouldFocus, clickHandler, votes, updateVotes, title, abstract, id, active }) => {

  const { user } = useContext(UserContext);

  const vote = async val => {
    if (!user) {
      fireModal('notLoggedIn', {actionName: 'vote'});
    } else {
      try {
        const res = await fetch(`${config.apiHost}/talks/${id}/${val}`, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + user
          }
        });
        const json = await res.json();

        updateVotes(json.newVal);
      } catch(e) {
        fireModal('networkError');
      }
    }
  }

  const toggle = () => active ? clickHandler(null) : clickHandler(id);

  const toggleOnEnter = e => {
    if (e.target === e.currentTarget // only fire for outer div, not inner controls
      && e.key === 'Enter') {
      toggle();
    }
  }

  return (
    <div
      className={active ? 'active talk' : 'talk'}
      tabIndex={0}
      onClick={() => clickHandler(id)}
      onKeyPress={toggleOnEnter}
      ref={active ? null : shouldFocus}
    >
      <div>
        <div className='header-row'>
          <h3>{title}</h3>
          <div className='votes'>
            Votes: {votes}
            {
              active && (
                <React.Fragment>
                  <button className='unstyled' onClick={() => vote('upvote')}>
                    <FontAwesomeIcon
                      className='vote-btn upvote'
                      icon='thumbs-up'
                      aria-label='upvote'
                      title='upvote'
                    />
                  </button>
                  <button className='unstyled' onClick={() => vote('downvote')}>
                    <FontAwesomeIcon
                      className='vote-btn downvote'
                      icon='thumbs-down'
                      aria-label='downvote'
                      title='downvote'
                    />
                  </button>
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
