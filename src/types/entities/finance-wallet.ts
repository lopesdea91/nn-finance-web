import { Enable, FinanceTypeId, _limitApi } from '../enum'

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
  _q?: string
  _limit?: _limitApi
  page?: number
  enable?: Enable
  panel?: number
}

// ConsolidateMonth
export interface FinanceWalletConsolidateMonthBalance {
  available: string,
  estimate: string,
  expense: { value: string },
  revenue: { value: string }
}
export interface FinanceWalletConsolidateMonthPayload {
  period: string
  wallet_id: number
}

export interface FinanceWalletConsolidateMonthTag {
  tag_key: string,
  value: string,
  description: string
  type: FinanceTypeId
}
export interface FinanceWalletConsolidateMonthOrigin {
  id: number,
  value: string,
  description: string
}

export interface FinanceWalletConsolidateMonth {
  balance: FinanceWalletConsolidateMonthBalance
  invoice: []
  origin: FinanceWalletConsolidateMonthOrigin[]
  tag: FinanceWalletConsolidateMonthTag[]
}
export interface FinanceWalletConsolidateMonthResponse {
  balance: FinanceWalletConsolidateMonthBalance
  invoice: []
  origin: FinanceWalletConsolidateMonthOrigin[]
  tag: FinanceWalletConsolidateMonthTag[]
}