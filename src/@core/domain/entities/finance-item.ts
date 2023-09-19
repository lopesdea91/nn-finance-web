import { IFinanceOriginShort } from '@/@core/domain/entities/finance-origin'
import { IFinanceStatus } from '@/@core/domain/entities/finance-status'
import { IFinanceTagShort } from '@/@core/domain/entities/finance-tag'
import { IFinanceType } from '@/@core/domain/entities/finance-type'
import { IFinanceWalletShort } from '@/@core/domain/entities/finance-wallet'

export interface IFinanceItem {
  id: number
  value: number
  date: string
  sort: number
  obs: string
  origin?: IFinanceOriginShort
  originId: number | null
  status?: IFinanceStatus
  statusId: number | null
  type?: IFinanceType
  typeId: number | null
  tagIds: IFinanceTagShort[]
  wallet?: IFinanceWalletShort
  walletId: number | null
  trashed?: boolean
}
