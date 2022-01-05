import React from 'react';
import PropTypes from 'prop-types';

import TopicItem from '../topic-item';

const TopicList = ({ topics }) => (
  <ul>
    {topics
      .sort((a, b) => a.rating < b.rating)
      .map(topic => (
        <li key={topic.id}>
          <TopicItem {...{ ...topic }} />
        </li>
      ))}
  </ul>
);

TopicList.propTypes = {
  topics: PropTypes.array
};

export default TopicList;
