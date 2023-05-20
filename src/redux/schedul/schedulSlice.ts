import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Schedul {
  schedulingCarpetId: number
  name: string
  surname: string
  address: string
  phone: string
  email: string
  note: string
  isSheduling: 0 | 1
  timeAt: string
}

const initialState = [{
    name: '',
    surname: '',
    address: '',
    phone: '',
    email: '',
    note: '',
    isSheduling: 0,
    timeAt: ''
  }] as Schedul[];

const schedulSlice = createSlice({
  name: 'schedul',
  initialState,
  reducers: {
    setSchedul (state, action) {
      if (Array.isArray(action.payload)) {
        state = [initialState, ...action.payload];
        return state;
      }
      state = [initialState, action.payload];
    },
    addSchedul (state, action) {
      if (Array.isArray(action.payload)) {
        state = [...state, ...action.payload];
        return state;
      }
      state.push(action.payload);
      return state;
    },
    removeSchedule (state, action) {
      state = state.filter((schedul: Schedul) => schedul.schedulingCarpetId !== action.payload);
      return state;
    }
  }
});

export const { setSchedul, addSchedul, removeSchedule } = schedulSlice.actions;

export default schedulSlice.reducer;

export const selectLastSchedul = (state: RootState) => state.schedul.slice(-1)[0];
export const selectSchedul = (state: RootState) => state.schedul.slice(1);