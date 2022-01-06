import axios from 'axios';

const PORT = 3000;

const instance = axios.create({
  baseURL: `http://localhost:${PORT}/api`
});

export const getTopics = async () => {
  const response = await instance.get('/topics');
  return response.data;
};

export const getTopic = async topicId => {
  const response = await instance.get(`/topics/${topicId}`);
  return response.data;
};

export const addTopic = async () => {
  const response = await instance.post('/topics');
  return response.data;
};

export const voteTopic = async (id, amount) => {
  const response = await instance.put(`/topics/${id}`, { amount });
  return response.data;
};
