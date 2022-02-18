import { createAsyncThunk } from '@reduxjs/toolkit';
import { $axios } from '../../../plugins/axios';
import { ITalk, ITalkCreateDTO } from './talks.types';

export const createTalk = createAsyncThunk('talks/create', async (payload: ITalkCreateDTO) => {
  const response = await $axios.post(`/v1/talks`, payload);
  return response.data as ITalk;
});

export const fetchTalks = createAsyncThunk(
  'talks/fetch',
  async (payload: { sort: string; page: number }) => {
    const response = await $axios.get('/v1/talks');
    return response.data;
  }
);
