import { FinanceOriginShort } from "@/types/entities/finance-origin"
import { FinanceType } from "@/types/entities/finance-type"
import { FinanceWalletShort } from "@/types/entities/finance-wallet"
import { Enable } from "@/types/enum"

export class FinanceOriginEntity {
  public id: number | undefined
  public description: string = ''
  public enable: Enable = 1
  public typeId: number | null = null
  public walletId: number | null = null
  public parentId: number | null = null

  constructor(data: InputFinanceOrigin) {
    this.id = data.id
    this.description = data.description
    this.enable = data.enable
    this.typeId = data.type.id
    this.walletId = data.wallet.id
    this.parentId = data.parent?.id ?? null
  }
}

interface InputFinanceOrigin {
  id?: number
  description: string
  enable: Enable
  type: FinanceType
  wallet: FinanceWalletShort
  parent: FinanceOriginShort | null
}