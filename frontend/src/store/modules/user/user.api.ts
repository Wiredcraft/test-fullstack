import { createAsyncThunk } from '@reduxjs/toolkit';
import { $axios } from '../../../plugins/axios';

export const login = createAsyncThunk(
  'user/login',
  async (payload: { code: string; provider: string }) => {
    const response = await $axios.get(`/v1/auth/${payload.provider}/callback?code=${payload.code}`);
    return response.data as IUser;
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  await $axios.delete(`/v1/auth`);
  return true;
});

export const fetchMe = createAsyncThunk('user/fetchMe', async () => {
  const response = await $axios.get('/v1/users/me');

  return response.data as IUser;
});
