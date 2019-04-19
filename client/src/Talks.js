import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@reach/router';

import Talk from './Talk';
import Title from './Title';
import Spinner from './Spinner';
import UserContext from './UserContext';
import fireModal from './fireModal';

import config from './config';

const Talks = (props) => {
  const [ talks, setTalks ] = useState([]);
  const [ loaded, setLoaded ] = useState(false);
  const [ active, setActive ] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    setLoaded(false);

    fetch(`${config.apiHost}/talks`)
    .then(async res => {
      const json = await res.json();

      const { talks, length } = json;

      const newTalks = Object.keys(talks)
        .map(k => {
          const t = talks[k];
          t.key = k;
          t.votes = t.votes || [];
          return t;
        });

      setTalks(newTalks);
      // setLength(length);

      setLoaded(true);
    });

  }, []);

  const checkUser = e => {
    if (!user) {
      e.preventDefault();
      fireModal('notLoggedIn', {actionName: 'create a new talk'});
    }
  }

  return (
    <React.Fragment>
      <Title text='Home' />
      {
        loaded
        ? (<div className='talks' onClickCapture={() => setActive(null)}>
          <div className='talks-inner body-container'>
            <div className='talks-header'>
              <h2>All Talks</h2>
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
                  ? talks.map(({ key, ...talk}) => {
                    return (
                      <Talk
                        active={active === key}
                        key={key}
                        id={key}
                        clickHandler={() => setActive(key)}
                        {...talk}
                      />
                    );
                  })
                  : <p>
                    No talks yet.
                    <Link to={`${process.env.PUBLIC_URL}/talks/new`}>
                      Add one!
                    </Link>
                  </p>
              }
            </div>
          </div>
        </div>)
        : <Spinner />
      }
      {/*<Pagination
        prev={length}
        next={length}
      />*/}
    </React.Fragment>
  );
}

export default Talks;
