import { Enable } from '@/types/enum'
import { IFinanceType } from '@/@core/domain/entities/finance-type'
import { FinanceWalletShort } from '@/@core/domain/entities/finance-wallet'

export interface IFinanceTag {
  id: number
  description: string
  enable: Enable
  type: IFinanceType
  typeId: number
  wallet: FinanceWalletShort
  walletId: number
  createdAt?: string
  updatedAt?: string
}
export interface IFinanceTagShort {
  id: number
  description: string
  type_id: number
}
