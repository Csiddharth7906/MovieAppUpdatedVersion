import { configureStore } from '@reduxjs/toolkit'
import {  } from "";
export const store = configureStore({
  reducer: {
    movie:movieReducer,
    tv:tvReducer,
    person:personReducer,
  },
})