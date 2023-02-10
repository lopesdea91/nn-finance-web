import { Enable } from '../enum'
import { FinanceType } from './finance-type'
import { FinanceWalletShort } from './finance-wallet'

export interface FinanceTag {
  id: number
  description: string
  enable: Enable
  type: FinanceType
  wallet: FinanceWalletShort
  createdAt: string
  updatedAt: string
}
export interface FinanceOriginShort {
  id: number
  description: string
}