import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info: null,
};


export const counterSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    
    loadmovie:(state,action)=>{
        state.info = action.payload;
    }
    
  },
})


export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer