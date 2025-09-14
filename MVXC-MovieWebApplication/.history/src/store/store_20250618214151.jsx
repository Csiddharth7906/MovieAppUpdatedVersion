import { configureStore } from '@reduxjs/toolkit'
i
export const store = configureStore({
  reducer: {
    movie:movieReducer,
    tv:tvReducer,
    person:personReducer,
  },
})