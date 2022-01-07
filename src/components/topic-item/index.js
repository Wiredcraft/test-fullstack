import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  RatingContainer,
  TitleContainer,
  Title,
  User
} from './styles';
import Voter from '../voter';

const TopicItem = ({ id, title, rating, user, onVote }) => {
  let navigate = useNavigate();

  return (
    <Container>
      <RatingContainer>
        <Voter {...{ id, rating, onVote }} />
      </RatingContainer>
      <TitleContainer
        onClick={() => {
          navigate(`/topics/${id}`);
        }}
      >
        <Title>{title}</Title>
        <User>by {user}</User>
      </TitleContainer>
    </Container>
  );
};

TopicItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  rating: PropTypes.number,
  user: PropTypes.string,
  onVote: PropTypes.func
};

export default TopicItem;
