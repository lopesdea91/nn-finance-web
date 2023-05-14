import { FinanceOrigin } from "../entities/finance-origin";
import { Enable, _limitApi } from "../enum";

export interface IPageSettingsFinanceOriginFormSearch {
  query: string
  enable: Enable
  parent_id: number | null
  wallet_id: number | null
  type_id: number[]
}
export interface IPageSettingsFinanceOriginTable {
  items: FinanceOrigin[]
  total: number
  limit: _limitApi
  page: number
}