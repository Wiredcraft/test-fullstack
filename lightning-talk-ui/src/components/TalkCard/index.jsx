import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { BASE_URL, like } from '@/request';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Player from '@/components/Player';

const TalkCard = (props) => {
  const {
    id,
    title,
    video,
    history,
    description,
    fetchTalks,
    user,
    users,
  } = props;

  const upVote = useCallback(
    async () => {
      if (!user) {
        history.push('/login');
        return;
      }
      try {
        await like(id, { users });
        fetchTalks();
      } catch (e) {
        if (e.statusCode && e.statusCode === 403) {
          history.push('/login');
        }
      }
    },
    [id, user, users],
  );

  const videos = video.map((v) => {
    const url = new URL(v.url, BASE_URL);
    return <Player key={v.id} src={url.href} />;
  });

  const liked = useMemo(
    () => !!users.find((u) => u.id === user),
    [users, user],
  );

  return (
    <div className="talk">
      <div className="talk__title">
        <h3>{title}</h3>
      </div>
      <div className="talk__player">{videos}</div>
      <div className="talk__desc">
        <p>{description}</p>
      </div>
      <button
        type="button"
        className={`talk__polling btn--text ${liked ? 'liked' : ''}`}
        onClick={upVote}
      >
        <span className="talk__polling-num">{users.length}</span>
      </button>
    </div>
  );
};

TalkCard.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  title: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired,
  video: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.object.isRequired,
  fetchTalks: PropTypes.func.isRequired,
};

TalkCard.defaultProps = {
};

const mapState = (state) => ({
  user: state.user.user,
});

const mapDispatch = ({ talks: { fetchTalks } }) => ({
  fetchTalks,
});

export default connect(
  mapState,
  mapDispatch,
)(withRouter(TalkCard));
