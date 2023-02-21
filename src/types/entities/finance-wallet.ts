import { Enable, _limitApi } from '../enum'

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
export interface FinanceWalletSearch {
  _total?: number
  _limit?: _limitApi
  _q?: string
  page?: number
  enable?: Enable
  panel?: number
}