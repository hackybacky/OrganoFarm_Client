import {createSlice} from "@reduxjs/toolkit";

const initialState ={
  currentUser : null,
  loading : false,
  erro : false,
};

export const videoSlice = createSlice({
  name: 'user',
 initialState,
  reducers: {
      loginStart:(state)=>{
        state.loading=false;
      },
      loginSuccess:(state,action)=>{
        state.loading=false;
        state.currentUser = action.payload;
      },
      loginFailure:(state)=>{
        state.loading=false;
        state.error = true;
      },
      logout :(state)=>{
        state.currentUser=null;
        state.loading=false;
        state.error = false;
      }
  },
})

export const { loginStart, logout, loginSuccess ,loginFailure } = videoSlice.actions

export default videoSlice.reducer;