import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getTopic } from '../../services/topics';
import { Container, Title, User, Description } from './styles';

const TopicDetail = () => {
  const [topic, setTopic] = useState([]);
  let params = useParams();
  let navigate = useNavigate();

  const fetchTopic = async () => {
    const response = await getTopic({ topicId: params.topicId });
    if (response) {
      setTopic(response);
    } else {
      navigate('/');
    }
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

export default TopicDetail;
