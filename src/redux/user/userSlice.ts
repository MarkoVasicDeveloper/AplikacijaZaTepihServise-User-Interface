import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface User {
  userId: number
  name: string
  surname: string
  email: string
  login: boolean
  address: string
  phone: string
  city: string
  coordinates: {
    lat: string
    lng: string
  },
};

const initialState = {} as User;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser (state, action) {
      state = {...state, ...action.payload};
      return state;
    },
    setCoordinates (state, action) {
      state.coordinates = {...action.payload}
    }
  }
});

export const { setUser, setCoordinates } = userSlice.actions;

export default userSlice.reducer;

export const selectUserEmail = (state: RootState) => state.user.email;
export const selectUserId = (state: RootState) => state.user.userId;
export const selectLogIn = (state: RootState) => state.user.login;