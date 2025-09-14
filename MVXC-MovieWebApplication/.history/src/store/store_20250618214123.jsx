import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    movie:movieReducer,
    tv:tvReducer,
    person:personReducer,
  },
})