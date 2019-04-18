import React, { useState, useEffect } from 'react';
import Talk from './Talk';
import Title from './Title';
import Pagination from './Pagination';

const Talks = (props) => {
  const [ talks, setTalks ] = useState([]);
  const [ active, setActive ] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/talks')
    .then(async res => {
      const json = await res.json();

      const newTalks = Object.keys(json.talks)
        .map(k => {
          const t = json.talks[k];
          t.key = k;
          t.votes = t.votes || [];
          return t;
        });

      setTalks(newTalks);
    });
  }, []);

  return (
    <React.Fragment>
      <Title text='Home' />
      <h2>Most Popular Talks</h2>
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
            : 'No talks yet. Add one!'
        }
      </div>
      <Pagination

      />
    </React.Fragment>
  );
}

export default Talks;
