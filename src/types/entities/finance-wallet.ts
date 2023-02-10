import { Enable } from '../enum'

export interface FinanceWallet {
  id: number,
  description: string,
  json: Record<string, string>,
  enable: Enable,
  panel: Enable
}
export interface FinanceWalletShort {
  id: number,
  description: string,
}