import axios from 'axios';
import { store } from '@/helpers';
import Toast from 'light-toast';

export const { BASE_URL } = process.env;

const request = axios.create({
  baseURL: BASE_URL,
  timeout: '15000',
});

request.interceptors.request.use(
  (config) => {
    const token = store.get('token');
    const configuration = config;
    if (!config.headers.Authorization && token) {
      configuration.headers.Authorization = `Bearer ${token}`;
    }
    return configuration;
  },
  (error) => Promise.reject(error),
);

request.interceptors.response.use(
  (res) => res,
  (err) => {
    Toast.fail('请求错误...', 2000);
    return Promise.reject(err);
  },
);

// Talks
export const fetchTalks = async ({ start, limit }) => {
  try {
    const { data } = await request.get(`/lightning-talks?_sort=polling:DESC&_start=${start}&_limit=${limit}`);
    return data;
  } catch {
    return [];
  }
};

export const createTalk = async (query) => {
  try {
    // create talk
    const { data: talk } = await request.post('/lightning-talks', query);
    // upload video and link to created talk
    const formData = new FormData();
    formData.append('files', query.video);
    formData.append('refId', talk.id);
    formData.append('ref', 'lightning-talk');
    formData.append('field', 'video');

    await request.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return 'data';
  } catch ({ response: { data: message } }) {
    throw message;
  }
};

export const like = async (id, { users }) => {
  const user = store.get('user');
  const isLiked = !!users.find((u) => u.id === user);

  let target = [];
  if (isLiked) {
    target = users.filter((u) => u.id !== user);
  } else {
    target = [...users, user];
  }

  try {
    const { data } = await request.put(`/lightning-talks/${id}`, {
      polling: target.length,
      users: target,
    });
    return data;
  } catch ({ response: { data } }) {
    throw data;
  }
};

// Users
export const register = async (query) => {
  try {
    const { data } = await request.post('/auth/local/register', query);
    return data;
  } catch ({ response: { data: message } }) {
    throw message;
  }
};

export const login = async (query) => {
  try {
    const { data } = await request.post('/auth/local', query);
    return data;
  } catch ({ response: { data: message } }) {
    throw message;
  }
};
