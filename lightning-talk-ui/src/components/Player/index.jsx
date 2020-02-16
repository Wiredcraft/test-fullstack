import React from 'react';
import PropTypes from 'prop-types';
import {
  Player as VideoPlayer,
  BigPlayButton,
} from 'video-react';

const Player = (props) => {
  const { src } = props;

  return (
    <VideoPlayer playsInline>
      <source src={src} />
      <BigPlayButton position="center" />
    </VideoPlayer>
  );
};

Player.propTypes = {
  src: PropTypes.string.isRequired,
};

Player.defaultProps = {
};

export default Player;
