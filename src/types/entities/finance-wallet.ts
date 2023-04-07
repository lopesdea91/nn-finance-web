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
  expense: string
  revenue: string
}
export interface FinanceWalletConsolidateMonthComposition { }
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
export interface FinanceWalletConsolidateMonthOriginTransactional {
  id: number
  description: string
  sum: string
  revenue: string
  expense: string
  average: string
}

export interface FinanceWalletConsolidateMonth {
  balance: FinanceWalletConsolidateMonthBalance
  composition: FinanceWalletConsolidateMonthComposition[]
  originTransactional: FinanceWalletConsolidateMonthOriginTransactional[]
  invoice: []
  tag: FinanceWalletConsolidateMonthTag[]
  status: FinanceWalletConsolidateMonthStatus[]
}
export interface FinanceWalletConsolidateMonthResponse {
  balance: FinanceWalletConsolidateMonthBalance
  composition: FinanceWalletConsolidateMonthComposition[]
  originTransactional: FinanceWalletConsolidateMonthOriginTransactional[]
  invoice: []
  tag: FinanceWalletConsolidateMonthTag[]
  status: FinanceWalletConsolidateMonthStatus[]
}
export interface FinanceWalletConsolidateMonthPayload {
  period: string
  wallet_id: number
}

export interface FinanceWalletProcessConsolidateMonthResponse {
  message: string
}
export interface FinanceWalletProcessConsolidateMonthPayload {
  form: {
    period: string
    wallet_id: number
  }
}


export interface FinanceWalletPeriodsData {
  year: string,
  months: {
    period: string
    label: string
  }[]
}
export interface FinanceWalletPeriodsDataResponse {
  items: FinanceWalletPeriodsData[]
}
export interface FinanceWalletPeriodsDataPayload {
  wallet_id: number
  format: 'group-periods'
}
