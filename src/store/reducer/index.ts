import { combineReducers } from '@reduxjs/toolkit'

import featureAuth from '../features/auth/authSlice'
import featureSystem from '../features/system/systemSlice'
import featureFinance from '../features/finance/financeSlice'

export const combineReducer = combineReducers({
  auth: featureAuth,
  system: featureSystem,
  finance: featureFinance,
})


export const reducers = {
  auth: featureAuth,
  system: featureSystem,
  finance: featureFinance,
}