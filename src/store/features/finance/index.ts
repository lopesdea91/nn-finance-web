
import { createSlice } from '@reduxjs/toolkit'

import initialState from './initialState'
import reducers from './reducers'

const slice = createSlice({
  name: 'finance',
  initialState,
  reducers,
})

export default slice.reducer

export const actionsFinanceSlice = slice.actions