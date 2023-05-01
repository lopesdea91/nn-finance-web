import { createSlice } from '@reduxjs/toolkit'

import initialState from './initialState'
import reducers from './reducers'

export const pageSettingsFinanceTagSlice = createSlice({
  name: 'pageSettingsFinanceTag',
  initialState,
  reducers,
})

export const actionsPageSettingsFinanceTag = pageSettingsFinanceTagSlice.actions