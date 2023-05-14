import { IPageSettingsFinanceWalletFormSearch, IPageSettingsFinanceWalletTable } from "@/types/pages/SettingsFinanceWallet"

export interface settingsFinanceWalletState {
  formSearch: IPageSettingsFinanceWalletFormSearch
  table: IPageSettingsFinanceWalletTable
}
const state: settingsFinanceWalletState = {
  formSearch: {
    query: '',
    enable: 1,
    panel: 1,
  },
  table: {
    items: [],
    total: 0,
    page: 0,
    limit: 15,
  }
}

export default state