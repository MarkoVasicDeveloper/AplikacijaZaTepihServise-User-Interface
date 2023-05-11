import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ForDelivery {
  carpetReceptionUser: number
  carpetReception: number
  client: {
    clientId: number
    name: string
    surname: string
    address: string
    phone: string
  }
  numberOfCarpets: number | null
  numberOfTracks: number | null
}

const initialState = [] as ForDelivery[];

const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    setForDelivery (state, action) {
      state = action.payload;
      return state;
    },
    removeReception (state, action) {
      return state.filter((reception: ForDelivery) => reception.carpetReception !== action.payload);
    }
  }
});

export const { setForDelivery, removeReception } = deliverySlice.actions;

export default deliverySlice.reducer;

export const selectForDelivery = (state: RootState) => state.delivery;