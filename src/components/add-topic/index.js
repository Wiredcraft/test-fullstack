import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { addTopic } from '../../services/topics';
import { Container, Title, Input, TextArea } from './styles';
import Button from '../common/button';

const AddTopic = () => {
  let navigate = useNavigate();
  let [formData, setFormData] = useState({
    user: '',
    title: '',
    description: ''
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await addTopic({ ...formData });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Title>Submit your lightning talk!</Title>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <TextArea
          type="text"
          name="description"
          placeholder="Describe your talk"
          value={formData.description}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="user"
          placeholder="Your name"
          value={formData.user}
          onChange={handleChange}
        />
        <Button type="submit" onSubmit={handleSubmit}>
          Submit
        </Button>
      </Container>
    </form>
  );
};

export default AddTopic;
