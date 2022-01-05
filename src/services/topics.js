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
