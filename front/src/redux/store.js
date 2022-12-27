import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './booksSlice';
import usersReducer from './usersSlice';

export const store = configureStore({
  reducer: {
    books:booksReducer,
    users:usersReducer,
  },
})