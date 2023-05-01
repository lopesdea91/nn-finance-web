import { createSlice } from '@reduxjs/toolkit'

import initialState from './initialState'
import reducers from './reducers'

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers,
})

export const actionsSystemSlice = systemSlice.actions