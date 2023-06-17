import { Enable, _limitApi } from '../enum'
import { FinanceType } from './finance-type'
import { FinanceWalletShort } from './finance-wallet'

export interface FinanceOrigin {
  id: number
  description: string
  enable: Enable
  type: FinanceType
  typeId: number
  wallet: FinanceWalletShort
  walletId: number
  parent: FinanceOriginShort | null
  parentId: number | null
  createdAt: string
  updatedAt: string
}
export interface FinanceOriginShort {
  id: number
  description: string
}