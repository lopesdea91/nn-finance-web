import { FinanceWallet } from "@/types/entities/finance-wallet"
import { FinanceWalletFormSearchFields } from "@/types/form/settingsFinanceWallet"

export interface settingsFinanceWalletState {
  search: FinanceWalletFormSearchFields
  items: FinanceWallet[]
  total: number
  lastPage: number
}
const state: settingsFinanceWalletState = {
  search: {
    _q: '',
    _limit: 15,
    page: 0,
    enable: 1,
    panel: 1,
  },
  items: [],
  total: 0,
  lastPage: 0,
}

export default state