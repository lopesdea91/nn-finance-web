import { IFinanceType } from '@/@core/domain/entities/finance-type'
import { IFinanceWalletShort } from '@/@core/domain/entities/finance-wallet'

export interface IFinanceOrigin {
  id: number
  description: string
  type?: IFinanceType
  typeId: number
  wallet?: IFinanceWalletShort
  walletId: number
  parent?: IFinanceOriginShort | null
  parentId: number | null
  trashed?: 1 | 0
}
export interface IFinanceOriginShort {
  id: number
  description: string
}
