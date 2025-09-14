import { configureStore } from '@reduxjs/toolkit'
impo
export const store = configureStore({
  reducer: {
    movie:movieReducer,
    tv:tvReducer,
    person:personReducer,
  },
})