import { configureStore } from '@reduxjs/toolkit';

import userReducer from './modules/user/userSlice';
import talksReducer from './modules/talks/talksSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    talks: talksReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
