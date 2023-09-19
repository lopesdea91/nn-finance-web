import { IFinanceItemTypePreview, FinanceItemRepeat, IFinanceStatusId, IFinanceTypeId, _limitApi } from '@/types/enum'
import { IFinanceOriginShort } from '@/@core/domain/entities/finance-origin'
import { IFinanceTagShort } from '@/@core/domain/entities/finance-tag'
import { IFinanceType } from '@/@core/domain/entities/finance-type'
import { IFinanceStatus } from '@/@core/domain/entities/finance-status'
import { IFinanceWalletShort } from '@/@core/domain/entities/finance-wallet'
import IHttpClient from '../../http/httpClient'
import { httpFilterParams, httpParseParams, httpPrepareUrl } from '@/@core/utils'
import IHttpResponsePage from '../../http/HttpResponsePage'
import { IFinanceItem } from '@/@core/domain/entities/finance-item'

export const financeItemGatewayV1 = (http: IHttpClient) => ({
  page: async (search: IPageProps) => {
    const searchParsed = {
      _paginate: true,
      _q: search.query,
      _limit: search.limit,
      _order: search.order,
      _sort: search.sort,
      page: search.page,
      status_id: search.statusId,
      type_id: search.typeId,
      origin_id: search.originId,
      wallet_id: search.walletId,
      tag_ids: search.tagIds,
      type_preview: search.typePreview,
      deleted: search.deleted,
      'min-date': search.minDate,
      'max-date': search.maxDate
    }

    const url = httpPrepareUrl({
      url: '/v1/finance/item',
      queryString: httpParseParams(httpFilterParams(searchParsed))
    })

    const { status, data } = await http.get<IHttpResponsePage<IDataResponse>>(url)

    return {
      status,
      data: pageParseResponse(status === 200 ? data : ({} as IHttpResponsePage<IDataResponse>))
    }
  },
  get: async (search: IGetProps = {}) => {
    const searchParsed = {
      _q: search.query,
      _limit: search.limit,
      page: search.page,
      status_id: search.statusId,
      type_id: search.typeId,
      origin_id: search.originId,
      wallet_id: search.walletId,
      tag_ids: search.tagIds,
      type_preview: search.typePreview,
      deleted: search.deleted,
      minDate: search.minDate,
      maxDate: search.maxDate
    }

    const url = httpPrepareUrl({
      url: '/v1/finance/item',
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
      url: '/v1/finance/item',
      id
    })

    const { status, data } = await http.get<IDataResponse>(url)

    return {
      status,
      data: dataParseResponse(data)
    }
  },
  post: async (form: IPostProps) => {
    if (form.obs === '') {
      delete form.obs
    }

    const url = httpPrepareUrl({
      url: '/v1/finance/item'
    })

    return await http.post<{ message: string }>(url, {
      ...form,
      origin_id: form.originId,
      status_id: form.statusId,
      tag_ids: form.tagIds,
      type_id: form.typeId,
      wallet_id: form.walletId
    })
  },
  put: async (id: number, form: IPutProps) => {
    if (form.obs === '') {
      delete form.obs
    }

    const url = httpPrepareUrl({
      url: '/v1/finance/item',
      id
    })

    return await http.put<{ message: string }>(url, {
      ...form,
      origin_id: form.originId,
      status_id: form.statusId,
      tag_ids: form.tagIds,
      type_id: form.typeId,
      wallet_id: form.walletId
    })
  },
  remove: async (id: number) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/item',
      id
    })

    return await http.delete(url)
  },
  restore: async (id: number) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/item-restore',
      id
    })

    return await http.get<{ message: string }>(url)
  },
  status: async (id: number, statusId: IFinanceStatusId) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/item-status'
    })

    return await http.post(url, {
      item_id: id,
      status_id: statusId
    })
  }
})

interface IPageProps {
  query?: string
  limit?: _limitApi
  page?: number
  sort?: 'asc' | 'desc'
  order?: 'id' | 'value' | 'date' | 'created' | 'updated'
  statusId?: IFinanceStatusId | null
  typeId?: IFinanceTypeId | null
  originId?: number[] | null
  tagIds?: number[] | null
  walletId?: number | null
  typePreview?: IFinanceItemTypePreview
  minDate?: string
  maxDate?: string
  deleted?: 1 | 0
}
interface IGetProps {
  query?: string
  limit?: _limitApi
  page?: number
  statusId?: IFinanceStatusId | null
  typeId?: IFinanceTypeId | null
  originId?: number[] | null
  tagIds?: number[] | null
  walletId?: number | null
  typePreview?: IFinanceItemTypePreview
  minDate?: string
  maxDate?: string
  deleted?: 1 | 0
}
interface IPostProps {
  value: number
  date: string
  sort: number
  balance: 1 | 0
  obs?: string
  originId: number
  statusId: IFinanceStatusId
  tagIds: number[]
  typeId: IFinanceTypeId
  walletId: number
  repeat: FinanceItemRepeat
}
interface IPutProps {
  value: number
  date: string
  sort: number
  balance: 1 | 0
  obs?: string
  originId: number
  statusId: IFinanceStatusId
  tagIds: number[]
  typeId: IFinanceTypeId
  walletId: number
  repeat: FinanceItemRepeat
}
interface IDataResponse {
  id: number
  value: number
  date: string
  sort: number
  obs: string
  origin: IFinanceOriginShort
  status: IFinanceStatus
  tag_ids: IFinanceTagShort[]
  type: IFinanceType
  wallet: IFinanceWalletShort
  trashed: boolean
}
const dataParseResponse = (data: IDataResponse): IFinanceItem => ({
  id: data.id,
  value: data.value,
  date: data.date,
  sort: data.sort,
  obs: data.obs,
  originId: data.origin.id,
  origin: data.origin,
  statusId: data.status.id,
  status: data.status,
  tagIds: data.tag_ids,
  typeId: data.type.id,
  type: data.type,
  walletId: data.wallet.id,
  wallet: data.wallet,
  trashed: data.trashed
})
const pageParseResponse = (data: IHttpResponsePage<IDataResponse>) => ({
  items: data?.items?.map(dataParseResponse) ?? [],
  page: data?.page ?? 0,
  total: data?.total ?? 0,
  limit: data?.limit ?? 15,
  lastPage: data?.lastPage ?? 0
})
