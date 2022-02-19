import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initBasePageState, initBaseState } from '../../core';
import { BasePageState, BaseState } from '../../core/types';
import type { RootState } from '../../store';
import { createTalk, fetchTalks, vote } from './talks.api';
import { ITalk } from './talks.types';

type SortType = 'popular' | 'newest';

export interface ITalksState extends BasePageState<ITalk> {
  sortType: SortType;
}

const initialState: ITalksState = {
  ...initBasePageState<ITalk>(),
  sortType: 'popular'
};

export const talksSlice = createSlice({
  name: 'talks',
  initialState,
  reducers: {
    changeSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    }
  },
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

        if (action.payload.meta.currentPage > 1) {
          state.ids = state.ids.concat(action.payload.items.map((it: ITalk) => it.id));
        } else {
          state.ids = action.payload.items.map((it: ITalk) => it.id);
        }

        action.payload.items.forEach((item: ITalk) => {
          state.all[item.id] = item;
        });

        state.meta = action.payload.meta;
      })
      .addCase(fetchTalks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = `${action.error.message}`;
      })
      .addCase(vote.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(vote.fulfilled, (state, action) => {
        state.status = 'succeeded';

        const talk = state.all[action.payload.id];

        let change = action.payload.voteState ? 1 : -1;

        state.all[action.payload.id] = {
          ...talk,
          voteCount: talk.voteCount + change
        };
      })
      .addCase(vote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = `${action.error.message}`;
      });
  }
});

export const { changeSortType } = talksSlice.actions;


export default talksSlice.reducer;
