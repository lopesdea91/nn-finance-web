import { createSlice } from '@reduxjs/toolkit'

export interface IState {
  menu: boolean
  period: string,
  walletPanelId: number | null,
}

const initialState: IState = {
  menu: false,
  period: '',
  walletPanelId: null
}

const slice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setPeriod(state, action: { payload: string }) {
      state.period = action.payload
    },
    setMenu(state, action: { payload: boolean }) {
      state.menu = action.payload
    },
    setWalletPanelId(state, action: { payload: number }) {
      state.walletPanelId = action.payload
    },
  }
})

export default slice.reducer

export const actionsSystemSlice = slice.actions