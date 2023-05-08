import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Reception {
  date: string,
  clientId: number,
  carpetReceptionUserId: number,
  carpetReceptionId: number,
  forPay: number,
  workerReceivedId: number,
  prepared: number,
  show: number
}

const initialState = {} as Reception;

const receptionSlice = createSlice({
  name: 'reception',
  initialState,
  reducers: {
    setReception (state, action) {
      state = { ...action.payload };
      return state;
    }
  }
});

export const { setReception } = receptionSlice.actions;

export default receptionSlice.reducer;

export const selectReception = (state: RootState) => state.reception;
export const selectReceptionForPay = (state: RootState) => state.reception.forPay;