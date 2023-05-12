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

const initialState = {
  newSchedul: [{
    name: '',
    surname: '',
    address: '',
    phone: '',
    email: '',
    note: '',
    isSheduling: 0,
    timeAt: ''
  }],
  oldSchedul: [{}]
} as {newSchedul: Schedul[], oldSchedul: Schedul[]};

const schedulSlice = createSlice({
  name: 'schedul',
  initialState,
  reducers: {
    setNewSchedul (state, action) {
      state.newSchedul.push(action.payload);
      return state;
    },
    setOldSchedule (state, action) {
      state.oldSchedul = action.payload;
    },
    removeSchedule (state, action) {
      state.oldSchedul.filter((schedul: Schedul) => schedul.schedulingCarpetId !== action.payload);
      return state;
    }
  }
});

export const { setNewSchedul, setOldSchedule, removeSchedule } = schedulSlice.actions;

export default schedulSlice.reducer;

export const selectLastSchedul = (state: RootState) => state.schedul.newSchedul.slice(-1)[0];
export const selectOldSchedul = (state: RootState) => state.schedul.oldSchedul;