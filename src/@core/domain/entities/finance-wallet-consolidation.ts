export interface IFinanceConsolidationMonthBalance {
  revenue: number
  expense: number
  available: number
  estimate: number
}
export interface IFinanceConsolidationMonthComposition {
  id: number
  valueCurrent: number
  valueLimit: number
  percentageLimit: number
  percentageCurrent: number
  tagId: number
  tagDescription: string
  consolidationId: number
}
export interface IFinanceConsolidationMonthOriginTransactional {
  id: number
  revenue: number
  expense: number
  average: number
  originId: number
  originDescription: string
  consolidationId: number
}
export interface IFinanceConsolidationMonthOriginCredit {
  id: number
  sum: number
  originId: number
  originDescription: string
  consolidationId: number
}
export interface IFinanceConsolidationYearBalance {
  label: string
  month: number
  balance: {
    revenue: number
    expense: number
  }
}
