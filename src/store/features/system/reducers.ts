import { systemStateSlice } from "./initialState"

export default {
  setPeriod(state: systemStateSlice, action: { payload: string }) {
    state.period = action.payload
  },
  setMenu(state: systemStateSlice, action: { payload: boolean }) {
    state.menu = action.payload
  },
  setWalletPanelId(state: systemStateSlice, action: { payload: number }) {
    state.walletPanelId = action.payload
  },
  setloading(state: systemStateSlice, action: { payload: boolean }) {
    state.loading = action.payload
  },
  setloadingPage(state: systemStateSlice, action: { payload: boolean }) {
    state.loadingPage = action.payload
  },
}