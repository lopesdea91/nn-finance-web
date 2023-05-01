import { Enable, FinanceTypeId, _limitApi } from '../enum'
import { FinanceType } from './finance-type'
import { FinanceWalletShort } from './finance-wallet'

export interface FinanceTagResponse {
  id: number
  description: string
  enable: Enable
  type: FinanceType
  wallet: FinanceWalletShort
  createdAt: string
  updatedAt: string
}
export interface FinanceTag {
  id: number
  description: string
  enable: Enable
  type: FinanceType
  typeId: number
  wallet: FinanceWalletShort
  walletId: number
  createdAt: string
  updatedAt: string
}
export interface FinanceTagShort {
  id: number
  description: string
  type_id: number
}
export interface FinanceTagSearch {
  _limit: _limitApi
  _q: string
  page: number
  enable: Enable
  type_id: FinanceTypeId | null
  wallet_id: number | null
}