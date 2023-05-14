import { FinanceTag } from "../entities/finance-tag";
import { Enable, FinanceTypeId, _limitApi } from "../enum";

export interface IPageSettingsFinanceTagFormSearch {
  query: string
  enable: Enable
  type_id: FinanceTypeId | null
  wallet_id: number | null
}
export interface IPageSettingsFinanceTagTable {
  items: FinanceTag[]
  total: number
  limit: _limitApi
  page: number
}