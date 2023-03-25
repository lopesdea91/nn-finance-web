import { FinanceItemSearch } from "@/types/entities/finance-item";
import { FinanceExtractTypePreveiw } from "@/types/enum";

export interface FinanceExtractFormSearchFields extends FinanceItemSearch {
  type_preveiw: FinanceExtractTypePreveiw
  period: string
}