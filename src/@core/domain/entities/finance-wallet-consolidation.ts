export interface IFinanceWalletConsolidationMonthBalance {
  revenue: number
  expense: number
  available: number
  estimate: number
}
export interface IFinanceWalletConsolidationMonthComposition {
  id: number
  valueCurrent: number
  valueLimit: number
  percentageLimit: number
  percentageCurrent: number
  tagId: number
  tagDescription: string
  consolidationId: number
}
export interface IFinanceWalletConsolidationMonthOriginTransactional {
  id: number
  revenue: number
  expense: number
  average: number
  originId: number
  originDescription: string
  consolidationId: number
}
export interface IFinanceWalletConsolidationMonthOriginCredit {
  id: number
  sum: number
  originId: number
  originDescription: string
  consolidationId: number
}
export interface IFinanceWalletConsolidationYearBalance {
  label: string
  month: number
  balance: {
    revenue: number
    expense: number
  }
}
