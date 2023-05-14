import { FinanceWallet } from "../entities/finance-wallet";
import { Enable, _limitApi } from "../enum";

export interface IPageSettingsFinanceWalletFormSearch {
  query: string
  enable: Enable
  panel: number
}
export interface IPageSettingsFinanceWalletTable {
  items: FinanceWallet[]
  total: number
  limit: _limitApi
  page: number
}