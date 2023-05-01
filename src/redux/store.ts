import { combineReducers, configureStore, type PreloadedState } from '@reduxjs/toolkit';

import userReducer from './user/userSlice';
import workerReducer from './worker/workerSlice';

const rootReducer = combineReducers({
  user: userReducer,
  worker: workerReducer
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      serializableCheck: false
    })
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
