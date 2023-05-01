
import { createSlice } from '@reduxjs/toolkit'

import initialState from './initialState'
import reducers from './reducers'

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers,
})

export const actionsLayout = layoutSlice.actions