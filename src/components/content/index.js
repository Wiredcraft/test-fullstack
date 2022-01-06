import React, { useState, useEffect } from 'react';

import { getTopics } from '../../services/topics';
import EmptyList from '../empty-list';
import TopicList from '../topic-list';

const Content = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const response = await getTopics();
      setTopics(response);
    };
    fetchTopics();
  }, []);

  return topics.length ? <TopicList {...{ topics }} /> : <EmptyList />;
};

export default Content;
