import { IFinanceOrigin, IFinanceOriginShort } from '@/@core/domain/entities/finance-origin'
import { _SortApi, _limitApi } from '@/types/enum'
import { IFinanceType } from '@/@core/domain/entities/finance-type'
import { IFinanceWalletShort } from '@/@core/domain/entities/finance-wallet'
import { httpPrepareUrl, httpParseParams, httpFilterParams, httpParsePage } from '@/@core/utils'
import IHttpResponsePage from '../../http/HttpResponsePage'
import IHttpClient from '../../http/httpClient'

export const financeOriginGatewayV1 = (http: IHttpClient) => ({
  page: async (search: IPageProps = {}) => {
    const searchParsed = {
      _paginate: true,
      _q: search?.query,
      _limit: search?.limit,
      page: search?.page,
      type_id: search?.typeId,
      wallet_id: search?.walletId,
      parent_id: search?.parentId,
      deleted: search?.deleted
    }

    const url = httpPrepareUrl({
      url: 'v1/finance/origin',
      queryString: httpParseParams(httpFilterParams(searchParsed))
    })

    const { status, data } = await http.get<IHttpResponsePage<IDataResponse>>(url)

    const dataParsed = httpParsePage(data)

    return {
      status,
      data: {
        ...dataParsed,
        items: dataParsed.items.map(dataParseResponse)
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
      parent_id: search?.parentId,
      deleted: search?.deleted
    }

    const url = httpPrepareUrl({
      url: '/v1/finance/origin',
      queryString: httpParseParams(httpFilterParams(searchParsed))
    })

    const { status, data } = await http.get<IDataResponse[]>(url)

    return {
      status,
      data: status === 200 ? data.map(dataParseResponse) : []
    }
  },
  id: async (id: number) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/origin',
      id
    })

    const { status, data } = await http.get<IDataResponse>(url)

    return {
      status,
      data: dataParseResponse(data)
    }
  },
  post: async (form: IPostProps) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/origin'
    })

    const { status, data } = await http.post<{ message: string }>(url, {
      description: form.description,
      type_id: form.typeId,
      wallet_id: form.walletId,
      parent_id: !!form.parentId ? form.parentId : null
    })

    return { status, data }
  },
  put: async (id: number, form: IPutProps) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/origin',
      id
    })

    const { status, data } = await http.put<{ message: string }>(url, {
      description: form.description,
      type_id: form.typeId,
      wallet_id: form.walletId,
      parent_id: !!form.parentId ? form.parentId : null
    })

    return { status, data }
  },
  remove: async (id: number) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/origin',
      id
    })

    const { status, data } = await http.delete(url)

    return { status, data }
  },
  restore: async (id: number) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/origin-restore',
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
  type_id: number
  wallet: IFinanceWalletShort
  wallet_id: number
  parent: IFinanceOriginShort | null
  parent_id: number | null
  trashed: 1 | 0
  // createdAt: string
  // updatedAt: string
}
interface IPageProps {
  query?: string
  limit?: _limitApi
  page?: number
  sort?: _SortApi
  order?: 'id' | 'description'
  typeId?: number[] | null
  walletId?: number | null
  parentId?: number | null
  deleted?: 1 | 0
}
interface IGetProps {
  query?: string
  limit?: _limitApi
  page?: number
  typeId?: number[] | null
  walletId?: number | null
  parentId?: number | null
  deleted?: 1 | 0
}
interface IPostProps {
  description: string
  typeId: number | null
  walletId: number | null
  parentId: number | null
}
interface IPutProps {
  description: string
  typeId: number | null
  walletId: number | null
  parentId: number | null
}
const dataParseResponse = (data: IDataResponse): IFinanceOrigin => ({
  id: data.id,
  description: data.description,
  type: data.type,
  typeId: data.type.id,
  wallet: data.wallet,
  walletId: data.wallet.id,
  parent: data.parent,
  parentId: data.parent?.id || null,
  trashed: data.trashed
  // createdAt: data.createdAt,
  // updatedAt: data.updatedAt,
})
