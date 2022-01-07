import React from 'react';
import PropTypes from 'prop-types';

import TopicItem from '../topic-item';
import { Container } from './styles';

const TopicList = ({ topics, onVote }) => (
  <Container>
    <tbody>
      {topics &&
        topics
          .sort((a, b) => a.rating < b.rating)
          .map(topic => <TopicItem key={topic.id} {...{ ...topic, onVote }} />)}
    </tbody>
  </Container>
);

TopicList.propTypes = {
  topics: PropTypes.array,
  onVote: PropTypes.func
};

export default TopicList;
