import { configureStore } from '@reduxjs/toolkit';

import talksReducer from './modules/talks/talksSlice';

export const store = configureStore({
  reducer: {
    talks: talksReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
