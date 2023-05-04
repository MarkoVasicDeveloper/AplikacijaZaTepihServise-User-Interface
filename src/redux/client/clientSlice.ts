import { createSlice } from "@reduxjs/toolkit";

interface Client {
  clientId: number
  name: string
  surname: string
  phone: string
  address: string
  userCarpetReceptions: []
  lastReception: []
  numberOfCarpet: number
  numberOfTracks: number
}

const initialState = {} as Client

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setClient (state, action) {
      state = { ...action.payload };
    }
  }
});

export const { setClient } = clientSlice.actions;

export default clientSlice.reducer;