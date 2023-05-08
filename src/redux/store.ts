import { combineReducers, configureStore, type PreloadedState } from '@reduxjs/toolkit';

import userReducer from './user/userSlice';
import workerReducer from './worker/workerSlice';
import clientReducer from './client/clientSlice';
import receptionReducer from './reception/receptionSlice';

const rootReducer = combineReducers({
  user: userReducer,
  worker: workerReducer,
  client: clientReducer,
  reception: receptionReducer
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
