import { Enable, _limitApi } from '../enum'
import { FinanceType } from './finance-type'
import { FinanceWalletShort } from './finance-wallet'


export interface FinanceTag {
  id: number
  description: string
  enable: Enable
  type: FinanceType
  typeId: number
  wallet: FinanceWalletShort
  walletId: number
  createdAt: string
  updatedAt: string
}
export interface FinanceTagShort {
  id: number
  description: string
  type_id: number
}
