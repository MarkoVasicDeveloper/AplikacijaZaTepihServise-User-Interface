import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface User {
  userId: number
  username: string
  email: string
  token: string
  login: boolean
}

const initialState = {} as User;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser (state, action) {
      state = {...action.payload};
      return state;
    }
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const selectUserEmail = (state: RootState) => state.user.email;
export const selectUserId = (state: RootState) => state.user.userId;