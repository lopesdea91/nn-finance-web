import { Enable } from "@/types/enum"
import { FinanceWalletSearch } from "@/types/entities/finance-wallet"

// form
export interface FinanceWalletFormFields {
  id: number | null,
  description: string,
  json: Record<string, string>,
  enable: Enable,
  panel: Enable
}
export interface FinanceWalletFormFieldsPost {
  // id: number | null,
  description: string,
  // json: Record<string, string>,
  // enable: Enable,
  // panel: Enable
}
export interface FinanceWalletFormFieldsPut {
  // id: number | null,
  description: string,
  json: string,
  enable: Enable,
  panel: Enable
}

// formSearch
export interface FinanceWalletFormSearchFields extends FinanceWalletSearch { }