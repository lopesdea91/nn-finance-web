import { createSlice } from '@reduxjs/toolkit'

import initialState from './initialState'
import reducers from './reducers'

const slice = createSlice({
  name: 'pageSettingsFinanceOrigin',
  initialState,
  reducers,
})

export default slice.reducer

export const {
  setList: pageSettingsFinanceOriginSetList,
  setSearch: pageSettingsFinanceOriginSetSearch
} = slice.actions