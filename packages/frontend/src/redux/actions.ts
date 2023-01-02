import { NewTalk, User } from '@models/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '@utils/http';

const getTalksApi = () => http.get('http://localhost:3000/talks/all');

export const getTalksData = createAsyncThunk('talks/getTalks', async () => {
  const result = await getTalksApi();
  return result;
});

const voteTalkApi = (id: string | number) => http.put(`http://localhost:3000/talk/vote/${id}`);

export const putTalkVote = createAsyncThunk('talk/vote', async (id: string | number) => {
  const result = await voteTalkApi(id);
  if (result.code === 200) {
    return id;
  }
  return result;
});

const addTalkApi = (payload: NewTalk) => http.post('http://localhost:3000/talk', { ...payload });

export const addTalk = createAsyncThunk('talk/add', async (payload: NewTalk) => {
  const result = await addTalkApi(payload);
  return result;
});

const signinApi = (payload: User) => http.post('http://localhost:3000/user/signin', { ...payload });

export const signin = createAsyncThunk('user/signin', async (payload: User) => {
  const result = await signinApi(payload);
  return result;
});
