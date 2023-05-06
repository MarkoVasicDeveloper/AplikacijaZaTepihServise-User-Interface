import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Client {
  clientId: number
  name: string
  surname: string
  phone: string
  address: string
  userCarpetReceptions: []
  lastReception: number
  numberOfCarpets: number
  numberOfTracks: number
  timeAt: string
}

const initialState = {} as Client;

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setClient (state, action) {
      state = { ...state, ...action.payload };
      return state;
    }
  }
});

export const { setClient } = clientSlice.actions;

export default clientSlice.reducer;

export const selectClientId = (state: RootState) => state.client.clientId;
export const selectClient = (state: RootState) => state.client;