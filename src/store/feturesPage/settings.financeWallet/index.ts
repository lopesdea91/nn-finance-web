import { createSlice } from '@reduxjs/toolkit'

import initialState from './initialState'
import reducers from './reducers'

export const pageSettingsFinanceWalletSlice = createSlice({
  name: 'pageSettingsFinanceWallet',
  initialState,
  reducers,
})

export const actionsPageSettingsFinanceWallet = pageSettingsFinanceWalletSlice.actions