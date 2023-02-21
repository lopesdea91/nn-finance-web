import { FinanceOriginShort } from "../entities/finance-origin"
import { FinanceType } from "../entities/finance-type"
import { FinanceWalletShort } from "../entities/finance-wallet"
import { Enable } from "../enum"

export interface FinanceOriginFormFields {
  id: number | null
  description: string
  enable: Enable
  typeId: number | null
  type?: FinanceType
  walletId: number | null
  wallet?: FinanceWalletShort
  parentId: number | null
  parent?: FinanceOriginShort
}
export interface FinanceOriginFormFieldsPost {
  // id: number | null
  description: string
  enable: Enable
  type_id: number | null
  // type?: FinanceType
  wallet_id: number | null
  // wallet?: FinanceWalletShort
  parent_id: number | null
  // parent?: FinanceOriginShort
}
export interface FinanceOriginFormFieldsPut {
  // id: number | null
  description: string
  enable: Enable
  type_id: number | null
  // type?: FinanceType
  wallet_id: number | null
  // wallet?: FinanceWalletShort
  parent_id: number | null
  // parent?: FinanceOriginShort
}
