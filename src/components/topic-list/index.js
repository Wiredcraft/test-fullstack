import React from 'react';
import PropTypes from 'prop-types';

import TopicItem from '../topic-item';

const TopicList = ({ topics, onVote }) => (
  <div>
    {topics
      .sort((a, b) => a.rating < b.rating)
      .map(topic => (
        <TopicItem key={topic.id} {...{ ...topic, onVote }} />
      ))}
  </div>
);

TopicList.propTypes = {
  topics: PropTypes.array,
  onVote: PropTypes.func
};

export default TopicList;
