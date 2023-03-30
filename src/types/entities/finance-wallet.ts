import { Enable, FinanceTypeId, _limitApi, FinanceStatusId } from '../enum'

export interface FinanceWallet {
  id: number
  description: string
  json: Record<string, string>,
  enable: Enable
  panel: Enable
}
export interface FinanceWalletShort {
  id: number
  description: string
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
  available: string
  estimate: string
  expense: { value: string }
  revenue: { value: string }
}
export interface FinanceWalletConsolidateMonthStatus {
  description: string
  count: string
  type_id: FinanceTypeId
  status_id: FinanceStatusId
}
export interface FinanceWalletConsolidateMonthTag {
  tag_description: string
  tag_ids: number[]
  sum: string
  type_id: FinanceTypeId
  // tag_key: string
  // value: string
  // description: string
  // type: FinanceTypeId
}
export interface FinanceWalletConsolidateMonthOrigin {
  id: number
  description: string
  sum: string
}

export interface FinanceWalletConsolidateMonth {
  balance: FinanceWalletConsolidateMonthBalance
  status: FinanceWalletConsolidateMonthStatus[]
  tag: FinanceWalletConsolidateMonthTag[]
  origin: FinanceWalletConsolidateMonthOrigin[]
  invoice: []
}
export interface FinanceWalletConsolidateMonthResponse {
  balance: FinanceWalletConsolidateMonthBalance
  status: FinanceWalletConsolidateMonthStatus[]
  tag: FinanceWalletConsolidateMonthTag[]
  origin: FinanceWalletConsolidateMonthOrigin[]
  invoice: []
}
export interface FinanceWalletConsolidateMonthPayload {
  period: string
  wallet_id: number
}
