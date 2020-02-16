import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LIMIT } from '@/helpers';

import TalkCard from '@/components/TalkCard';

export const Home = (props) => {
  const { fetchTalks, talks, hasMore } = props;
  const [start, setStart] = useState(0);

  const loadTalks = useCallback(
    async () => {
      await fetchTalks({ start, limit: LIMIT });
      setStart(start + LIMIT);
    },
    [fetchTalks, start],
  );

  useEffect(
    () => {
      loadTalks();
    },
    [],
  );

  const content = talks.map((talk) => <TalkCard key={talk.id} {...talk} />);

  return (
    <div className="page">
      <h2 className="hidden-title">Home</h2>
      <div className="talks-wrapper">
        {talks.length > 0 ? content : (
          <div className="talks-placeholder">
            <p>Nothing yet to display</p>
            <Link to="/post">post the first Lightning Talk</Link>
          </div>
        )}
        {hasMore && (
          <button type="button" className="load-more btn--text" onClick={loadTalks}>
            Load more
          </button>
        )}
      </div>
    </div>
  );
};

Home.propTypes = {
  fetchTalks: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  talks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Home.defaultProps = {
};

const mapState = (state) => ({
  talks: state.talks.talks,
  hasMore: state.talks.hasMore,
});

const mapDispatch = ({
  talks: {
    fetchTalks,
    loadMoreTalks,
  },
}) => ({
  fetchTalks,
  loadMoreTalks,
});

export default connect(mapState, mapDispatch)(Home);
