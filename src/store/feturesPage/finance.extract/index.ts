import { createSlice } from '@reduxjs/toolkit'

import initialState from './initialState'
import reducers from './reducers'

const slice = createSlice({
  name: 'pageFinanceExtract',
  initialState,
  reducers,
})

export default slice.reducer

export const {
  setList: pageFinanceExtractSetList,
  setSearch: pageFinanceExtractSetSearch
} = slice.actions