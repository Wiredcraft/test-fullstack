import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { getTopic } from '../../services/topics';

const TopicDetail = () => {
  const [topic, setTopic] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchTopic = async () => {
      const response = await getTopic(params.topicId);
      setTopic(response);
    };
    fetchTopic();
  }, []);

  return <div>{topic.title}</div>;
};

TopicDetail.propTypes = {
  id: PropTypes.id,
  title: PropTypes.string,
  description: PropTypes.string,
  rating: PropTypes.number,
  user: PropTypes.string,
  date: PropTypes.date
};

export default TopicDetail;
