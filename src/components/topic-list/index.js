import React from 'react';
import PropTypes from 'prop-types';

import TopicItem from '../topic-item';

const TopicList = ({ topics }) => (
  <div>
    {topics
      .sort((a, b) => a.rating < b.rating)
      .map(topic => (
        <TopicItem key={topic.id} {...{ ...topic }} />
      ))}
  </div>
);

TopicList.propTypes = {
  topics: PropTypes.array
};

export default TopicList;
