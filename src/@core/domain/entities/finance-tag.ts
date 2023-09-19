import { IFinanceType } from '@/@core/domain/entities/finance-type'
import { IFinanceWalletShort } from '@/@core/domain/entities/finance-wallet'

export interface IFinanceTag {
  id: number
  description: string
  type?: IFinanceType
  typeId: number
  wallet?: IFinanceWalletShort
  walletId: number
  trashed?: 1 | 0
}
export interface IFinanceTagShort {
  id: number
  description: string
  type_id: number
}
