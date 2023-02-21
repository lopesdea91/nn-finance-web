import { FinanceItemSearch } from "../entities/finance-item";
import { FinanceExtractTypePreveiw } from "../enum";

export interface FinanceExtractFormSearchFields extends FinanceItemSearch {
  type_preveiw: FinanceExtractTypePreveiw
  period?: string
}