import { createSlice } from '@reduxjs/toolkit'

import initialState from './initialState'
import reducers from './reducers'

export const pageSettingsFinanceWalletIdSlice = createSlice({
  name: 'pageSettingsFinanceWalletId',
  initialState,
  reducers,
})

export const actionsPageSettingsFinanceWalletId = pageSettingsFinanceWalletIdSlice.actions