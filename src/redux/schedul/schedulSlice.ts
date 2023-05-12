import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Schedul {
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
      state = [ ...state, ...action.payload ];
      return state;
    }
  }
});

export const { setSchedul } = schedulSlice.actions;

export default schedulSlice.reducer;

export const selectLastSchedul = (state: RootState) => state.schedul.slice(-1)[0];