import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    movie: require('./reducers/movieSlice').default,
    tv: require('./reducers/tvSlice').default,
    person: require('./reducers/personSlice').default,
  },
})