import { Enable } from '@/types/enum'
import { IFinanceOriginShort } from '@/@core/domain/entities/finance-origin'
import { IFinanceStatus } from '@/@core/domain/entities/finance-status'
import { IFinanceTagShort } from '@/@core/domain/entities/finance-tag'
import { IFinanceType } from '@/@core/domain/entities/finance-type'
import { FinanceWalletShort } from '@/@core/domain/entities/finance-wallet'

export interface IFinanceItem {
  id: number
  value: number
  date: string
  sort: number
  enable: Enable
  obs: string
  originId: number
  origin: IFinanceOriginShort
  statusId: number
  status: IFinanceStatus
  tagIds: IFinanceTagShort[]
  typeId: number
  type: IFinanceType
  walletId: number
  wallet: FinanceWalletShort
  createdAt: string
  updatedAt: string
}
