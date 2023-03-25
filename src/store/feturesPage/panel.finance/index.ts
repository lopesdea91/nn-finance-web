import { createSlice } from '@reduxjs/toolkit'

import initialState from './initialState'
import reducers from './reducers'

const slice = createSlice({
  name: 'pagePanelFinance',
  initialState,
  reducers,
})

export default slice.reducer

export const {
  setData: pagePanelFinanceSetData,
} = slice.actions
