import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { reducer } from './reducer';

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppStore = ReturnType<typeof store['getState']>;
export type AppDispatch = typeof store['dispatch'];
export type onChangeSearchProps<F> = Partial<Record<keyof F, string | number>>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStore, unknown, Action>
