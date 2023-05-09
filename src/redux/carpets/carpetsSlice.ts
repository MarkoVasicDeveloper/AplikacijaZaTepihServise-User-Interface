import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Carpet {
  carpetId: number
  carpetReception: number
  carpetReceptionUser: number
  carpetSurface: number
  deliveryTime: string
  forPayment: number
  height: number
  price: number
  userId: number
  width: number
  workerId: number
  index: number
}

const initialState = [] as Carpet[];

const carpetSlice = createSlice({
  name: 'carpets',
  initialState,
  reducers: {
    setCarpets (state, action: PayloadAction<Carpet>) {
      state = state.push(action.payload) as any;
    },
    setCarpetsEmpty (state, action) {
      state = action.payload
      return state;
    },
    removeCarpet (state, action) {
      state = state.filter((carpet: Carpet) => carpet.index !== action.payload.index);
      return state;
    },
    editCarpetPrice (state, action: PayloadAction<{index: number, price: number}>) {
      const carpet = state.find((car: Carpet) => car.index === action.payload.index);
      if(carpet) carpet.forPayment = action.payload.price;
      return state;
    }
  }
});

export const { setCarpets, setCarpetsEmpty, removeCarpet, editCarpetPrice } = carpetSlice.actions;

export default carpetSlice.reducer;

export const selectCarpets = (state: RootState) => state.carpets;