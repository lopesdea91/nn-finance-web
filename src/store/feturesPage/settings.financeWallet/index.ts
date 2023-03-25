import { createSlice } from '@reduxjs/toolkit'

import initialState from './initialState'
import reducers from './reducers'

const slice = createSlice({
  name: 'pageSettingsFinanceWallet',
  initialState,
  reducers,
})

export default slice.reducer

export const {
  setList: pageSettingsFinanceWalletSetList,
  setSearch: pageSettingsFinanceWalletSetSearch
} = slice.actions