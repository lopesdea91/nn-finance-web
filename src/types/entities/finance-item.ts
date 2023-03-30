import { Enable, FinanceStatusId, FinanceTypeId, _limitApi } from '../enum'
import { FinanceOriginShort } from './finance-origin'
import { FinanceStatus } from './finance-status'
import { FinanceTagShort } from './finance-tag'
import { FinanceType } from './finance-type'
import { FinanceWalletShort } from './finance-wallet'

export type FinanceItemRepeat = 'UNIQUE'

export interface FinanceItem {
  id: number
  value: number
  date: string
  sort: number
  enable: Enable
  obs: string
  origin: FinanceOriginShort,
  status: FinanceStatus
  tag_ids: FinanceTagShort[]
  type: FinanceType
  wallet: FinanceWalletShort
  createdAt: string
  updatedAt: string
}
export interface FinanceItemShort {
}
export interface FinanceItemSearch {
  // _total?: number
  // lastPage?: number
  _q: string
  _limit: _limitApi
  page: number
  enable: Enable
  status_id: FinanceStatusId | null
  type_id: FinanceTypeId | null
  origin_id: number | null
  wallet_id: number | null
  tag_ids: number[] | null
}