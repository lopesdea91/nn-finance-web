import { Enable } from "@/types/enum"

export interface IFinanceWalletEntity {
  id: number
  description: string
  json: Record<string, string>,
  enable: Enable
  panel: Enable
}

export class FinanceWalletEntity {
  public id: number | null = null
  public description: string | null = ''
  public json: Record<string, string> | null = null
  public enable: Enable | null = 1
  public panel: Enable | null = 0

  constructor(data: IFinanceWalletEntity) {
    this.set(data)
  }
  private set(data: IFinanceWalletEntity) {
    this.id = data.id
    this.description = data.description
    this.json = data.json
    this.enable = data.enable
    this.panel = data.panel
  }
}