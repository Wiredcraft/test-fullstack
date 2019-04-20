import React, { useState, useEffect, useContext, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@reach/router';

import TalkCard from '../components/TalkCard';
import Title from '../components/Title';
import Spinner from '../components/Spinner';
import UserContext from '../components/UserContext';

import fireModal from '../utils/fireModal';
import config from '../utils/config';

const Talks = (props) => {
  const [ talks, setTalks ] = useState([]);
  const [ loaded, setLoaded ] = useState(false);
  const [ active, setActive ] = useState(null);

  const shouldFocus = useRef(null);

  const setVotes = (talkId, newVotes) => {
    const talk = talks.find(talk => talk.id === talkId);
    talk.votes = newVotes;
    setTalks(talks);
    setActive(null);
    shouldFocus.current.focus();
    setActive(talkId);
  };

  const { user } = useContext(UserContext);

  useEffect(() => {
    setLoaded(false);

    fetch(`${config.apiHost}/talks`)
    .then(async res => {
      const json = await res.json();

      const { talks } = json;

      const newTalks = Object.keys(talks)
        .map(k => {
          const t = talks[k];
          t.id = k;
          return t;
        });

      setTalks(newTalks);

      setLoaded(true);
    });

  }, []);

  const checkUser = e => {
    if (!user) {
      e.preventDefault();
      fireModal('notLoggedIn', {actionName: 'create a new talk'});
    }
  };

  const orderByVotes = talks => talks.sort((a, b) => b.votes - a.votes);

  return (
    <React.Fragment>
      <Title text='Home' />
      {
        loaded
        ? (<div className='talks' onClickCapture={() => setActive(null)}>
          <div className='talks-inner body-container'>
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
                          idx={idx}
                          updateVotes={newVotes => {
                            setVotes(id, newVotes);
                          }}
                          shouldFocus={shouldFocus}
                          active={active === id}
                          key={id}
                          id={id}
                          clickHandler={val => setActive(val)}
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
          </div>
        </div>)
        : <Spinner />
      }
    </React.Fragment>
  );
}

export default Talks;
