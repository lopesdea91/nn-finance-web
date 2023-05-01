import { createSlice } from '@reduxjs/toolkit'

import initialState from './initialState'
import reducers from './reducers'

export const pageFinanceExtractSlice = createSlice({
  name: 'pageFinanceExtract',
  initialState,
  reducers,
})

export const actionsPageFinanceExtract = pageFinanceExtractSlice.actions