import { Talk, User, Vote } from './data.model';

export const users: User[] = [
  {
    id: 1,
    name: 'admin',
    password: '123456',
  },
];

export const talks: Talk[] = [
  {
    id: 1,
    subject: 'test subject',
    content: 'test content2',
    author: 'admin author',
    author_id: 1,
    voted: 0,
    created_time: 1672584872000,
  },
];

export const votes: Vote[] = [
  {
    id: 1,
    user_id: 1,
    talk_id: 1,
    created_time: 1672594872000,
  },
];
