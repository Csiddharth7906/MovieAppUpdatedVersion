import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info: null,
};


export const Slice = createSlice({
  name: 'movie',
  initialState,
  reducers: {

    loadmovie: (state,action)=>{
        state.info = action.payload;
    },

    removemovie: (state,action)=>{
        state.info = null;
    }
  },
})


export const { loadmovie,removemovie} = Slice.actions

export default Slice.reducer