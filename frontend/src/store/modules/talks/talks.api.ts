import { createAsyncThunk, miniSerializeError, SerializedError } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { $axios } from '../../../plugins/axios';
import { addVoteId, removeVoteId } from '../user/userSlice';
import { ITalk, ITalkCreateDTO } from './talks.types';

export const createTalk = createAsyncThunk(
  'talks/create',
  async (payload: ITalkCreateDTO, thunkAPI) => {
    try {
      const response = await $axios.post(`/v1/talks`, payload);

      thunkAPI.dispatch(addVoteId(response.data.id));

      return response.data as ITalk;

    } catch (err: any) {
      throw miniSerializeError(err.response.data);
    }
  }
);

export const fetchTalks = createAsyncThunk(
  'talks/fetch',
  async (payload: { sort: string; page: number }) => {
    const response = await $axios.get(`/v1/talks?sort=${payload.sort}&page=${payload.page}`);
    return response.data;
  }
);

export const vote = createAsyncThunk('talks/vote', async (payload: string, thunkAPI) => {
  const response = await $axios.put(`/v1/talks/${payload}/vote`);

  if (response.data) {
    thunkAPI.dispatch(addVoteId(payload));
  } else {
    thunkAPI.dispatch(removeVoteId(payload));
  }

  return { voteState: response.data, id: payload };
});
