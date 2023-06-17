import { AxiosStatic } from "axios";

import { FinanceOriginType } from "@/@core/domain/entity/FinanceOriginType";
import { FinanceStatus } from "@/@core/domain/entity/FinanceStatus";
import { FinanceTag } from "@/@core/domain/entity/FinanceTag";
import { FinanceOrigin, FinanceOriginShort } from "@/types/entities/finance-origin";
import { FinanceType } from "@/types/entities/finance-type";
import { FinanceWallet, FinanceWalletShort } from "@/types/entities/finance-wallet";
import { Enable, FinanceStatusId, FinanceTypeId } from "@/types/enum";

const url = '/v1/finance'

export class FinanceGeteway {
  constructor(private request: AxiosStatic) { }

  async data() {
    const result = await this.request.get<IDataResponse>(`${url}/data`)

    return {
      ...result,
      data: dataParseResponse(result.data)
    }
  }
}

interface IDataResponse {
  "wallet_panel": IDataWalletResponse,
  "wallet": IDataWalletResponse[],
  "origin": IDataOriginResponse[],
  "tag": IDataTagResponse[],
  "type": IDataTypeResponse[],
  "status": IDataStatusResponse[],
  "origin_type": IDataOriginTypeResponse[]
}
interface IDataWalletResponse {
  id: number
  description: string
  enable: number
  panel: number
}
interface IDataOriginResponse {
  id: number
  description: string
  enable: number
  type: FinanceType,
  parent?: FinanceOriginShort,
  wallet: FinanceWalletShort
}
interface IDataTagResponse {
  id: number
  description: string
  enable: Enable
  type: FinanceType
  wallet: FinanceWalletShort
}
interface IDataTypeResponse {
  id: FinanceTypeId
  description: string
}
interface IDataStatusResponse {
  id: FinanceStatusId
  description: string
}
interface IDataOriginTypeResponse {
  id: number
  description: string
}
const dataWalletParseResponse = (data: IDataWalletResponse): FinanceWallet => ({
  id: data.id,
  description: data.description,
  enable: data.enable as Enable,
  panel: data.panel as Enable
})
const dataOriginParseResponse = (data: IDataOriginResponse) => ({
  id: data.id,
  description: data.description,
  enable: data.enable,
  typeId: data.type.id,
  type: data.type,
  parentId: data.parent?.id,
  parent: data.parent,
  walletId: data.wallet.id,
  wallet: data.wallet
})
const dataTagParseResponse = (data: IDataTagResponse) => ({
  id: data.id,
  description: data.description,
  enable: data.enable,
  typeId: data.type.id,
  type: data.type,
  walletId: data.wallet.id,
  wallet: data.wallet,
})
const dataTypeParseResponse = (data: IDataTypeResponse) => ({
  id: data.id,
  description: data.description,
})
const dataStatusParseResponse = (data: IDataStatusResponse) => ({
  id: data.id,
  description: data.description,
})
const dataOriginTypeParseResponse = (data: IDataOriginTypeResponse) => ({
  id: data.id,
  description: data.description,
})
const dataParseResponse = (data: IDataResponse) => {
  return {
    walletPanel: dataWalletParseResponse(data.wallet_panel),
    wallet: data.wallet.map(dataWalletParseResponse),
    origin: data.origin.map(dataOriginParseResponse),
    tag: data.tag.map(dataTagParseResponse),
    type: data.type.map(dataTypeParseResponse),
    status: data.status.map(dataStatusParseResponse),
    originType: data.origin_type.map(dataOriginTypeParseResponse)
  }
}