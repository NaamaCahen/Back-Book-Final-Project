import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './booksSlice';
import usersReducer from './usersSlice';
import assigningReducer from './assigningSlice';

export const store = configureStore({
  reducer: {
    books:booksReducer,
    users:usersReducer,
    assign:assigningReducer,
  },
})