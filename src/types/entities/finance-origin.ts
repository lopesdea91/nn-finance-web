import { Enable, FinanceTypeId, _limitApi } from '../enum'
import { FinanceType } from './finance-type'
import { FinanceWalletShort } from './finance-wallet'

export interface FinanceOrigin {
  id: number
  description: string
  enable: Enable
  type: FinanceType
  typeId: number | null
  wallet: FinanceWalletShort
  walletId: number | null
  parent: FinanceOriginShort | null
  parentId: number | null
}
export interface FinanceOriginShort {
  id: number
  description: string
}
export interface FinanceOriginSearch {
  _q: string
  _limit: _limitApi
  page: number
  enable: Enable
  type_id: number[] | null
  wallet_id: number | null
  parent_id: number | null
}