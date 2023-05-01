import { createSlice } from '@reduxjs/toolkit'

import initialState from './initialState'
import reducers from './reducers'

export const pagePanelFinanceSlice = createSlice({
  name: 'pagePanelFinance',
  initialState,
  reducers,
})

export const actionsPagePanelFinance = pagePanelFinanceSlice.actions
