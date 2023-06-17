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
  originId: number
  origin: FinanceOriginShort,
  statusId: number
  status: FinanceStatus
  tagIds: FinanceTagShort[]
  typeId: number
  type: FinanceType
  walletId: number
  wallet: FinanceWalletShort
  createdAt: string
  updatedAt: string
}

