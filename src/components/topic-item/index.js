import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { Container, Rating, Title, User, Date } from './styles';

const TopicItem = ({ id, title, description, rating, user, date }) => {
  let navigate = useNavigate();

  return (
    <Container
      onClick={() => {
        navigate(`/topics/${id}`);
      }}
    >
      <Rating>{rating}</Rating>
      <Title>{title}</Title>
      <User>{user}</User>
      <Date>{date}</Date>
    </Container>
  );
};

TopicItem.propTypes = {
  id: PropTypes.id,
  title: PropTypes.string,
  description: PropTypes.string,
  rating: PropTypes.number,
  user: PropTypes.string,
  date: PropTypes.date
};

export default TopicItem;
