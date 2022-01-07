import React from 'react';
import PropTypes from 'prop-types';

import { Container, RatingDisplay, UpButton, DownButton } from './styles';

const Voter = ({ id, rating, onVote }) => {
  return (
    <Container>
      <UpButton onClick={() => onVote(id, 1)} />
      <DownButton onClick={() => onVote(id, -1)} />
      <RatingDisplay>{rating}</RatingDisplay>
    </Container>
  );
};

Voter.propTypes = {
  id: PropTypes.number,
  rating: PropTypes.number,
  onVote: PropTypes.func
};

export default Voter;
