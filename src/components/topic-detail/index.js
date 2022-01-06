import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { getTopic } from '../../services/topics';
import { Container, Title, User, Description } from './styles';

const TopicDetail = () => {
  const [topic, setTopic] = useState([]);
  const params = useParams();

  const fetchTopic = async () => {
    const response = await getTopic(params.topicId);
    setTopic(response);
  };

  useEffect(() => {
    fetchTopic();
  }, []);

  return (
    <Container>
      <Title>{topic.title}</Title>
      <User>by {topic.user}</User>
      <Description>{topic.description}</Description>
    </Container>
  );
};

TopicDetail.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  rating: PropTypes.number,
  user: PropTypes.string,
  date: PropTypes.date
};

export default TopicDetail;
