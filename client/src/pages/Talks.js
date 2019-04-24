import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@reach/router';

import TalkCard from '../components/TalkCard';
import Title from '../components/Title';
import Spinner from '../components/Spinner';
import UserContext from '../components/UserContext';

import { fireModal, NOT_LOGGED_IN, NETWORK_ERROR } from '../utils/fireModal';
import config from '../utils/config';

import  { LOADING, LOADED, ERROR } from '../utils/loadingStatuses';

const Talks = () => {
  const [ talks, setTalks ] = useState([]);
  const [ status, setStatus ] = useState(LOADING);
  const [ active, setActive ] = useState(null);

  const talkCardRef = React.createRef();

  const setVotes = (talkId, newVotes) => {
    const talk = talks.find(talk => talk.id === talkId);
    talk.votes = newVotes;
    setTalks(talks);
    const _current = talkCardRef.current;
    setActive(null);
    _current.focus();
    setActive(talkId);
  };

  const { user } = useContext(UserContext);

  useEffect(() => {
    setStatus(LOADING);

    (async () => {

      try {
        const res = await fetch(`${config.apiHost}/talks`);
        const json = await res.json();

        const { talks } = json;

        const newTalks = Object.keys(talks)
        .map(k => {
          const t = talks[k];
          t.id = k;
          return t;
        });

        setTalks(newTalks);

        setStatus(LOADED);
      } catch(e) {
        fireModal(NETWORK_ERROR);
        setStatus(ERROR);
      }

    })();

  }, []);

  const checkUser = e => {
    if (!user) {
      e.preventDefault();
      fireModal(NOT_LOGGED_IN, {actionName: 'create a new talk'});
    }
  };

  const orderByVotes = talks => talks.sort((a, b) => b.votes - a.votes);

  return (
    <React.Fragment>
      <Title text='Home' />
      {status === LOADING
        ? <Spinner />
        : (<div className='talks' onClickCapture={() => setActive(null)}>
            <div className='talks-inner body-container'>
            {status === ERROR
              ? (<React.Fragment>
                  <h2>Network Error</h2>
                  <p>Please try again later.</p>
                </React.Fragment>
              )
              : (<React.Fragment>
                <div className='talks-header'>
                  <h2>Upcoming Talk Proposals</h2>
                  <Link
                    to={`${process.env.PUBLIC_URL}/talks/new`}
                    className='new-talk-btn'
                    onClick={checkUser}
                  >
                    <FontAwesomeIcon
                      icon='plus'
                      role='button'
                      aria-label='new talk'
                      title='new talk'
                    />
                  </Link>
                </div>
                <div>
                {
                  talks.length
                  ? orderByVotes(talks)
                  .map(({ id, ...talk }, idx) => {
                    return (
                      <TalkCard
                        ref={talkCardRef}
                        idx={idx}
                        updateVotes={newVotes => {
                          setVotes(id, newVotes);
                        }}
                        active={active === id}
                        key={id}
                        id={id}
                        setActive={setActive}
                        {...talk}
                      />
                    );
                  })
                  : <p>
                    {'No talks yet. '}
                    <Link className='styled-link' to={`${process.env.PUBLIC_URL}/talks/new`}>
                     Add one!
                    </Link>
                  </p>
                }
              </div>
            </React.Fragment>)
            }

          </div>
        </div>)
      }
    </React.Fragment>
  );
}

export default Talks;
