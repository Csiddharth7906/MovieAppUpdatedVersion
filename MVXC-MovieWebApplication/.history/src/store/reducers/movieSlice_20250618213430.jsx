import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info: null,
};


export const Slice = createSlice({
  name: '',
  initialState,
  reducers: {

    load: (state,action)=>{
        state.info = action.payload;
    },

    remove: (state,action)=>{
        state.info = null;
    }
  },
})


export const { load,remove} = Slice.actions

export default Slice.reducer