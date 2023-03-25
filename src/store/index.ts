import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { reducers } from './reducer';


export const store = configureStore({
  reducer: reducers,
})

export type AppStore = ReturnType<typeof store['getState']>;
export type AppDispatch = typeof store['dispatch'];

export type onChangeSearchProps<F> = Partial<Record<keyof F, string | number>>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStore, unknown, Action>
