import { Enable } from '@/types/enum'
import { IFinanceType } from '@/@core/domain/entities/finance-type'
import { FinanceWalletShort } from '@/@core/domain/entities/finance-wallet'

export interface IFinanceOrigin {
  id: number
  description: string
  enable: Enable
  type: IFinanceType
  typeId: number
  wallet: FinanceWalletShort
  walletId: number
  parent: IFinanceOriginShort | null
  parentId: number | null
}
export interface IFinanceOriginShort {
  id: number
  description: string
}
