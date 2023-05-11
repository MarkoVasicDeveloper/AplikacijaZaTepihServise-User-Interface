import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {};

const billSlice = createSlice({
  name: 'bill',
  initialState,
  reducers: {
    setBill (state, action) {
      state = {...state, ...action.payload};
      return state;
    }
  }
});

export const { setBill } = billSlice.actions;

export default billSlice.reducer;

export const selectBill = (state: RootState) => state.bill;