import { createSlice } from '@reduxjs/toolkit';
import { signin } from './actions';

interface UserState {
  token: string;
}

const initialState: UserState = {
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signin.fulfilled, (state: UserState, { payload }) => {
        if (payload.code === 200) {
          window.sessionStorage.setItem('token', payload.data);
          state.token = payload.data;
        } else {
          throw new Error('signin error');
        }
      })
      .addCase(signin.rejected, () => {
        throw new Error('getTalksData 🚀 ~ rejected');
      });
  },
});

export default userSlice.reducer;
