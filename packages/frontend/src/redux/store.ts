import { configureStore } from '@reduxjs/toolkit';
import talksReducer from './talksSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    talks: talksReducer,
    user: userReducer,
  },
});

export default store;
