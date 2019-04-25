import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import UserContext from '../components/UserContext';
import { apiHost } from '../utils/config';
import ordinalize from '../utils/ordinalize';
import { fireModal, NOT_LOGGED_IN, NETWORK_ERROR } from '../utils/fireModal';

const TalkCard = ({ idx, setActive, votes, updateVotes, title, abstract, id, active }, ref) => {
  const { user } = useContext(UserContext);

  const vote = async val => {
    if (!user) {
      fireModal(NOT_LOGGED_IN, {actionName: 'vote'});
    } else {
      try {
        const res = await fetch(`${apiHost}/talks/${id}/${val}`, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + user
          }
        });
        const json = await res.json();

        updateVotes(json.newVal);
      } catch(e) {
        fireModal(NETWORK_ERROR);
      }
    }
  };

  const medal = [ 'gold', 'silver', 'bronze' ][idx];

  const toggle = () => active ? setActive(null) : setActive(id);

  const toggleOnEnter = e => {
    if (e.target === e.currentTarget // only fire for outer div, not inner controls
      && e.key === 'Enter') {
      toggle();
    }
  };

  return (
    <div
      className={active ? 'active talk' : 'talk'}
      tabIndex={0}
      onClick={() => setActive(id)}
      onKeyPress={toggleOnEnter}
      ref={active ? ref : null}
    >
      <div>
        <div className='header-row'>
          {medal ? (
            <FontAwesomeIcon
              className={`medal ${medal}`}
              icon='medal'
              aria-label={`${ordinalize(idx + 1)} place`}
              title={`${ordinalize(idx + 1)} place`}
            />
          ) : <span
              className='place'
              aria-label={`${ordinalize(idx + 1)} place`}
              title={`${ordinalize(idx + 1)} place`}
            >
              {idx + 1}
            </span>}

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
      {active && (
        <React.Fragment>{
          abstract
            .split(/\n\s*\n/)
            .map((para, idx) => <p key={idx}>{para}</p>)
        }</React.Fragment>
      )}
    </div>
  );
};

export default React.forwardRef(TalkCard);
