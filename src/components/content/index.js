import React, { useState, useEffect } from 'react';

import { getTopics, voteTopic } from '../../services/topics';
import EmptyList from '../empty-list';
import TopicList from '../topic-list';

const Content = () => {
  const [topics, setTopics] = useState();

  const fetchTopics = async () => {
    const response = await getTopics();
    setTopics(response);
  };

  const onVote = async (id, amount) => {
    await voteTopic({ id, amount });
    fetchTopics();
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return topics ? (
    topics.length ? (
      <TopicList {...{ topics, onVote }} />
    ) : (
      <EmptyList />
    )
  ) : null;
};

export default Content;
