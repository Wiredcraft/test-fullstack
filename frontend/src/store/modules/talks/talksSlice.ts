import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initBasePageState, initBaseState } from '../../core';
import { BasePageState, BaseState } from '../../core/types';
import type { RootState } from '../../store';
import { createTalk, fetchTalks } from './talks.api';
import { ITalk } from './talks.types';

export interface ITalksState extends BasePageState<ITalk> {}

const initialState: ITalksState = initBasePageState<ITalk>();

export const talksSlice = createSlice({
  name: 'talks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createTalk.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createTalk.fulfilled, (state, action) => {
        state.status = 'succeeded';

        if (!state.ids.includes(action.payload.id)) {
          state.ids.push(action.payload.id);
        }

        state.all[action.payload.id] = action.payload;
      })
      .addCase(createTalk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = `${action.error.message}`;
      })
      .addCase(fetchTalks.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchTalks.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.ids = action.payload.items.map((it: ITalk) => it.id);

        action.payload.items.forEach((item: ITalk) => {
          state.all[item.id] = item;
        });

        state.meta = action.payload.meta;
      })
      .addCase(fetchTalks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = `${action.error.message}`;
      });
  }
});

export default talksSlice.reducer;
