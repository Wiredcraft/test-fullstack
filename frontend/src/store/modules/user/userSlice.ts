import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { login, logout } from './user.api';

export interface IUserState {
  user: IUser;
  loggedIn: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const loggedIn = localStorage.getItem('fs_auth') === 'true' || false;

const initialState: IUserState = {
  user: { id: '', name: '', voteIds: [] },
  loggedIn,
  status: 'idle',
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.loggedIn = true;
        localStorage.setItem('fs_auth', 'true');
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = `${action.error.message}`;
      })
      .addCase(logout.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = initialState.user;
        state.status = 'idle'
        state.error = null;
        state.loggedIn = false;
        localStorage.setItem('fs_auth', 'false');
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = `${action.error.message}`;
      });
  }
});

export default userSlice.reducer;
