import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// Configure the store with the user slice reducer
export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});
