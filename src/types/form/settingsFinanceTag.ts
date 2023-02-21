import { Enable, FinanceTypeId } from "../enum"
import { FinanceTagSearch } from "../entities/finance-tag"

// form
export interface FinanceTagFormFields {
  id: number | null
  description: string
  enable: Enable
  typeId: FinanceTypeId | null
  // type: FinanceType
  walletId: number | null
  // wallet: FinanceWalletShort
  // createdAt: string
  // updatedAt: string
}
export interface FinanceTagFormFieldsPost {
  description: string
  enable: Enable
  type_id: FinanceTypeId
  wallet_id: number | null
}
export interface FinanceTagFormFieldsPut {
  description: string
  enable: Enable
  type_id: FinanceTypeId
  wallet_id: number | null
}

// formSearch
export interface FinanceTagFormSearchFields extends FinanceTagSearch { }