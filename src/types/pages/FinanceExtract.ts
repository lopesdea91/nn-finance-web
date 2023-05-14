import { FinanceItem } from "../entities/finance-item";
import { Enable, FinanceExtractTypePreveiw, FinanceStatusId, _limitApi } from "../enum"

export interface IPageFinanceExtractFormSearch {
  query: string,
  enable: Enable,
  status_id: FinanceStatusId,
  type_id: number | null,
  origin_id: number | null,
  // wallet_id: number | null,
  tag_ids: number[],
  type_preveiw: FinanceExtractTypePreveiw,
}
export interface IPageFinanceExtractTable {
  items: FinanceItem[],
  total: number,
  limit: _limitApi,
  page: number,
}