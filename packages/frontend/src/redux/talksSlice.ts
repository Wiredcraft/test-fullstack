import { createSlice } from '@reduxjs/toolkit';
import { Talk } from '@src/models';
import { getTalksData, putTalkVote, addTalk } from './actions';

interface TalksState {
  data: Talk[];
}

const initialState: TalksState = {
  data: [],
};

const talksSlice = createSlice({
  name: 'talks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTalksData.fulfilled, (state: TalksState, { payload }) => {
        state.data = payload.data;
      })
      .addCase(getTalksData.rejected, () => {
        throw new Error('getTalksData 🚀 ~ rejected');
      })
      .addCase(putTalkVote.fulfilled, (state, { payload }) => {
        const { data } = state;
        const needUpdateItem = data.find((item) => item.id === payload);
        needUpdateItem!.voted += 1;
      })
      .addCase(putTalkVote.rejected, () => {
        throw new Error('putTalkVote 🚀 ~ rejected');
      })
      .addCase(addTalk.rejected, () => {
        throw new Error('addTalk 🚀 ~ rejected');
      });
  },
});

export default talksSlice.reducer;
