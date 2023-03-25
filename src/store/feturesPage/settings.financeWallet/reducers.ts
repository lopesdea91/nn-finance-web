import { FinanceWallet, FinanceWalletSearch } from "@/types/entities/finance-wallet"
import { settingsFinanceWalletState } from "./initialState"

export default {
  setSearch(state: settingsFinanceWalletState, action: { payload: Partial<FinanceWalletSearch> }) {
    state.search = {
      ...state.search,
      ...action.payload
    }
  },
  setList(state: settingsFinanceWalletState, action: { payload: { items: FinanceWallet[], total: number, lastPage: number } }) {
    state.items = action.payload.items
    state.total = action.payload.total
    state.lastPage = action.payload.lastPage
  }
}