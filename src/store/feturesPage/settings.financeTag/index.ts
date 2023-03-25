import { createSlice } from '@reduxjs/toolkit'

import initialState from './initialState'
import reducers from './reducers'

const slice = createSlice({
  name: 'pageSettingsFinanceTag',
  initialState,
  reducers,
})

export default slice.reducer

export const {
  setList: pageSettingsFinanceTagSetList,
  setSearch: pageSettingsFinanceTagSetSearch
} = slice.actions