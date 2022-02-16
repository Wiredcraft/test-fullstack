import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface UserState {
  user: IUser;
}

const initialState: UserState = {
  user: {} as IUser
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
});

export default userSlice.reducer;
