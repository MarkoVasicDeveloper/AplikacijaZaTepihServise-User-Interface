import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Reception {
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
    },
    setForPay (state, action) {
      state.forPay = state.forPay + action.payload;
      return state;
    },
    setNewPayment (state, action: PayloadAction<{ oldPrice: number; newPrice: number; }>) {
      state.forPay = state.forPay - action.payload.oldPrice + action.payload.newPrice;
      return state;
    }
  }
});

export const { setReception, setForPay, setNewPayment } = receptionSlice.actions;

export default receptionSlice.reducer;

export const selectReception = (state: RootState) => state.reception;
export const selectReceptionForPay = (state: RootState) => state.reception.forPay;