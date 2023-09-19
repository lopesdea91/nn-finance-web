export interface IFinanceWallet {
  id: number
  description: string
  panel: 1 | 0
  trashed?: 1 | 0
}
export interface IFinanceWalletShort {
  id: number
  description: string
}
export interface IFinanceWalletPeriod {
  year: string
  months: {
    period: string
    label: string
  }[]
}
