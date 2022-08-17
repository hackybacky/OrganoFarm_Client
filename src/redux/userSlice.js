import {createSlice} from "@reduxjs/toolkit";

const initialState ={
  currentUser : null,
  loading : false,
  erro : false,
};

export const userSlice = createSlice({
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
      },
      subscription:(state,action)=>{
        if(!state.currentUser.subscribedUsers.include(action.payload)){
          state.currentUser.subscribedUsers.push(action.payload);
        }
      },
      unsubscription:(state,action)=>{
        if(state.currentUser.subscribedUsers.include(action.payload)){
          state.currentUser.subscribedUsers.splice(
            state.currentUser.subscribedUsers.findIndex(
              (userId) => userId === action.payload
            ),
            1
          );
        }
      }
  },
})

export const { loginStart, logout, loginSuccess ,loginFailure,subscription,unsubscription } = userSlice.actions

export default userSlice.reducer;