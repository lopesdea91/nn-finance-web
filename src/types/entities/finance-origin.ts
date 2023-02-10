import { Enable } from '../enum'
import { FinanceType } from './finance-type'
import { FinanceWalletShort } from './finance-wallet'

export interface FinanceOrigin {
  id: number
  description: string
  enable: Enable
  type: FinanceType
  wallet: FinanceWalletShort
  parent: FinanceOriginShort | null
}
export interface FinanceOriginShort {
  id: number
  description: string
}