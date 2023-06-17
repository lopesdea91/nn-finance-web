import { Enable, _limitApi } from '../enum'

export interface FinanceWallet {
  id: number
  description: string
  enable: Enable
  panel: Enable
}
export interface FinanceWalletShort {
  id: number
  description: string
}
