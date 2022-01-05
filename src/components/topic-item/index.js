import React from 'react';
import PropTypes from 'prop-types';

const TopicItem = ({ id, title, description, rating, user, date }) => (
  <div>
    <p>{id}</p>
    <p>{rating}</p>
    <p>{title}</p>
    <p>{description}</p>
    <p>{user}</p>
    <p>{date}</p>
  </div>
);

TopicItem.propTypes = {
  id: PropTypes.id,
  title: PropTypes.string,
  description: PropTypes.string,
  rating: PropTypes.number,
  user: PropTypes.string,
  date: PropTypes.date
};

export default TopicItem;
