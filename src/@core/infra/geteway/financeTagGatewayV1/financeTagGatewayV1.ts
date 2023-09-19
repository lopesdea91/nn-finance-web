import { IFinanceTag } from '@/@core/domain/entities/finance-tag'
import { IFinanceTypeId, _OrderApi, _SortApi, _limitApi } from '@/types/enum'
import { IFinanceType } from '@/@core/domain/entities/finance-type'
import { IFinanceWalletShort } from '@/@core/domain/entities/finance-wallet'
import { httpPrepareUrl, httpParseParams, httpFilterParams, httpParsePage } from '@/@core/utils'
import IHttpResponsePage from '../../http/HttpResponsePage'
import IHttpClient from '../../http/httpClient'

export const financeTagGatewayV1 = (http: IHttpClient) => ({
  page: async (search: IPageProps = {}) => {
    const searchParsed = {
      _paginate: true,
      _q: search?.query,
      _limit: search?.limit,
      page: search?.page,
      type_id: search?.typeId,
      wallet_id: search?.walletId,
      deleted: search?.deleted
    }

    const url = httpPrepareUrl({
      url: '/v1/finance/tag',
      queryString: httpParseParams(httpFilterParams(searchParsed))
    })

    const { status, data } = await http.get<IHttpResponsePage<IDataResponse>>(url)

    const dataParse = httpParsePage(data)

    return {
      status,
      data: {
        ...dataParse,
        items: dataParse.items.map(dataParseResponse)
      }
    }
  },
  get: async (search: IGetProps = {}) => {
    const searchParsed = {
      _q: search?.query,
      _limit: search?.limit,
      page: search?.page,
      type_id: search?.typeId,
      wallet_id: search?.walletId,
      deleted: search?.deleted
    }

    const url = httpPrepareUrl({
      url: '/v1/finance/tag',
      queryString: httpParseParams(httpFilterParams(searchParsed))
    })

    const { status, data } = await http.get<IDataResponse[]>(url)

    const dataParsed = data.map(dataParseResponse)

    return {
      status,
      data: dataParsed
    }
  },
  id: async (id: number) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/tag',
      id
    })

    const { status, data } = await http.get<IDataResponse>(url)

    const dataParsed = dataParseResponse(data)

    return {
      status,
      data: dataParsed
    }
  },
  post: async (form: IPostProps) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/tag'
    })

    const { status, data } = await http.post<{ message: string }>(url, {
      description: form.description,
      type_id: form.typeId,
      wallet_id: form.walletId
    })

    return { status, data }
  },
  put: async (id: number, form: IPutProps) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/tag',
      id
    })

    const { status, data } = await http.put<{ message: string }>(url, {
      description: form.description,
      type_id: form.typeId,
      wallet_id: form.walletId
    })

    return { status, data }
  },
  remove: async (id: number) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/tag',
      id
    })

    const { status, data } = await http.delete(url)

    return { status, data }
  },
  restore: async (id: number) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/tag-restore',
      id
    })

    const { status, data } = await http.get<{ message: string }>(url)

    return { status, data }
  }
})

interface IDataResponse {
  id: number
  description: string
  type: IFinanceType
  wallet: IFinanceWalletShort
  trashed: 1 | 0
}
interface IPageProps {
  query?: string
  limit?: _limitApi
  page?: number
  sort?: _SortApi
  order?: _OrderApi
  typeId?: IFinanceTypeId[]
  walletId?: number
  deleted?: 1 | 0
}
interface IGetProps {
  query?: string
  limit?: _limitApi
  page?: number
  sort?: _SortApi
  order?: _OrderApi
  typeId?: IFinanceTypeId[]
  walletId?: number
  deleted?: 1 | 0
}
interface IPostProps {
  description: string
  typeId: IFinanceTypeId
  walletId: number
}
interface IPutProps {
  description: string
  typeId: IFinanceTypeId
  walletId: number
}
const dataParseResponse = (data: IDataResponse): IFinanceTag => {
  return {
    id: data.id,
    description: data.description,
    type: data.type,
    typeId: data.type?.id as number,
    wallet: data.wallet,
    walletId: data.wallet?.id as number,
    trashed: data.trashed
  }
}
