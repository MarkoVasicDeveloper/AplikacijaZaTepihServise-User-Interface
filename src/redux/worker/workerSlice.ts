import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Worker {
  name: string
  id: number
  login: boolean
}

const initialState = {} as Worker;

export const workerSlice = createSlice({
  name: 'worker',
  initialState,
  reducers: {
    setWorker (state, action) {
      state = { ...action.payload };
      return state;
    }
  }
});

export const { setWorker } = workerSlice.actions;

export default workerSlice.reducer;

export const selectWorkerId = (state: RootState) => state.worker.id;
export const selectWorkerName = (state: RootState) => state.worker.name;
export const selectWorkerLogin = (state: RootState) => state.worker.login;