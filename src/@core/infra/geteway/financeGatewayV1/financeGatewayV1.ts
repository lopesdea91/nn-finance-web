import { IFinanceWallet, IFinanceWalletShort } from '@/@core/domain/entities/finance-wallet'
import IHttpClient from '../../http/httpClient'
import { Enable, IFinanceTypeId, IFinanceStatusId } from '@/types/enum'
import { IFinanceType } from '@/@core/domain/entities/finance-type'
import { IFinanceOrigin, IFinanceOriginShort } from '@/@core/domain/entities/finance-origin'
import { IFinanceTag } from '@/@core/domain/entities/finance-tag'
import { IFinanceStatus } from '@/@core/domain/entities/finance-status'
import { IFinanceOriginType } from '@/@core/domain/entities/finance-originType'

export const financeGatewayV1 = (http: IHttpClient) => ({
  data: async () => {
    const { status, data } = await http.get<IDataResponse>('/v1/finance/data')

    return {
      status,
      data: dataParseResponse(data)
    }
  }
})

interface IDataResponse {
  wallet_panel: IDataWalletResponse
  wallet: IDataWalletResponse[]
  origin: IDataOriginResponse[]
  tag: IDataTagResponse[]
  type: IDataTypeResponse[]
  status: IDataStatusResponse[]
  origin_type: IDataOriginTypeResponse[]
}
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

interface IDataWalletResponse {
  id: number
  description: string
  enable: Enable
  panel: Enable
}
const dataWalletParseResponse = (data: IDataWalletResponse): IFinanceWallet => ({
  id: data.id,
  description: data.description,
  panel: data.panel,
  enable: data.enable
})

interface IDataOriginResponse {
  id: number
  description: string
  enable: Enable
  type: IFinanceType
  parent?: IFinanceOriginShort
  wallet: IFinanceWalletShort
}
const dataOriginParseResponse = (data: IDataOriginResponse): IFinanceOrigin => ({
  id: data.id,
  description: data.description,
  enable: data.enable,
  typeId: data.type.id,
  type: data.type,
  parentId: (data?.parent?.id ?? null) as IFinanceOrigin['parentId'],
  parent: (data?.parent ?? null) as IFinanceOrigin['parent'],
  walletId: data.wallet.id,
  wallet: data.wallet
})

interface IDataTagResponse {
  id: number
  description: string
  enable: Enable
  type: IFinanceType
  wallet: IFinanceWalletShort
}
const dataTagParseResponse = (data: IDataTagResponse): IFinanceTag => ({
  id: data.id,
  description: data.description,
  enable: data.enable,
  typeId: data.type.id,
  type: data.type,
  walletId: data.wallet.id,
  wallet: data.wallet
})

interface IDataTypeResponse {
  id: IFinanceTypeId
  description: string
}
const dataTypeParseResponse = (data: IDataTypeResponse): IFinanceType => ({
  id: data.id,
  description: data.description
})

interface IDataStatusResponse {
  id: IFinanceStatusId
  description: string
}
const dataStatusParseResponse = (data: IDataStatusResponse): IFinanceStatus => ({
  id: data.id,
  description: data.description
})

interface IDataOriginTypeResponse {
  id: number
  description: string
}
const dataOriginTypeParseResponse = (data: IDataOriginTypeResponse): IFinanceOriginType => ({
  id: data.id,
  description: data.description
})
