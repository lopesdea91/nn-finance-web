
import { createSlice } from '@reduxjs/toolkit'

import initialState from './initialState'
import reducers from './reducers'

export const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers,
})

export const actionsFinance = financeSlice.actions