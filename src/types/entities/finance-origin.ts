import { Enable, FinanceTypeId, _limitApi } from '../enum'
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
export interface FinanceOriginSearch {
  _total: number
  _limit: _limitApi
  _q: string
  page: number
  enable: Enable
  type_id: number[]
  wallet_id: number | null
  parent_id: number | null
}