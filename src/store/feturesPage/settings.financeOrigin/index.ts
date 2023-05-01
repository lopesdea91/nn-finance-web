import { createSlice } from '@reduxjs/toolkit'

import initialState from './initialState'
import reducers from './reducers'

export const pageSettingsFinanceOriginSlice = createSlice({
  name: 'pageSettingsFinanceOrigin',
  initialState,
  reducers,
})

export const actionsPageSettingsFinanceOrigin = pageSettingsFinanceOriginSlice.actions