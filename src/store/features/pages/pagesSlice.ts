import { FinanceWalletParams } from '@/types/entities/FinanceWallet'
import { createSlice } from '@reduxjs/toolkit'

export interface IState {
  SettingsFinanceWallet: FinanceWalletParams
}
const initialState: IState = {
  SettingsFinanceWallet: {
    page: 1,
    limit: 15,
    _q: '',
    enable: 1,
  }
}

const slice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setSettingsFinanceWallet(state, { payload }: { payload: FinanceWalletParams }) {
      state.SettingsFinanceWallet = payload
    },
  }
})

export default slice.reducer

export const {
  setSettingsFinanceWallet
} = slice.actions