import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchMe, login, logout } from './user.api';

export interface IUserState {
  user: IUser;
  loggedIn: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const loggedIn = localStorage.getItem('fs_auth') === 'true' || false;

const emptyState = {
  user: { id: '', name: '', voteTalkIds: [] },
  loggedIn: false,
  status: 'idle' as const,
  error: null
};

const initialState: IUserState = { ...emptyState };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addVoteId: (state, action: PayloadAction<string>) => {
      if (!state.user.voteTalkIds.includes(action.payload)) {
        state.user.voteTalkIds.push(action.payload);
      }
    },
    removeVoteId: (state, action: PayloadAction<string>) => {
      const idIndex = state.user.voteTalkIds.indexOf(action.payload);

      state.user.voteTalkIds.splice(idIndex, 1);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = { ...state.user, ...action.payload };
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
        state.user = { ...emptyState.user };
        state.status = 'idle';
        state.error = null;
        state.loggedIn = false;
        localStorage.setItem('fs_auth', 'false');
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = `${action.error.message}`;

        // log the person out anyways, if there's an error in logging out
        // only errors that could happen are 401/500, both which need logging back in again.
        state.loggedIn = false;
        localStorage.setItem('fs_auth', 'false');
      })
      .addCase(fetchMe.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
        state.loggedIn = true;
        localStorage.setItem('fs_auth', 'true');
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.status = 'failed';
        localStorage.setItem('fs_auth', 'false');
        state.loggedIn = false;
        state.error = `${action.error.message}`;
      });
  }
});

export const { addVoteId, removeVoteId } = userSlice.actions;

export default userSlice.reducer;
