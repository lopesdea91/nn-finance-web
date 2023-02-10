import { configureStore } from '@reduxjs/toolkit'
import { reducers } from './reducer';

export const makeStore = () => {
  return configureStore({
    reducer: reducers,
  })
}
export const store = makeStore()

export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = typeof store.dispatch