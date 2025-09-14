import { configureStore } from '@reduxjs/toolkit'
import mo from "./reducers/movieSlice";
export const store = configureStore({
  reducer: {
    movie:movieReducer,
    tv:tvReducer,
    person:personReducer,
  },
})