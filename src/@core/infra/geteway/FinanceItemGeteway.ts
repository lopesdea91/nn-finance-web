import { AxiosStatic } from "axios";
import { Enable, FinanceExtractTypePreveiw, FinanceStatusId, FinanceTypeId, _limitApi } from "@/types/enum";
import { $utils } from "@/utils";
import { PageResponse } from "@/types/request";
import { FinanceOriginShort } from "@/types/entities/finance-origin";
import { FinanceTagShort } from "@/types/entities/finance-tag";
import { FinanceType } from "@/types/entities/finance-type";
import { FinanceStatus } from "@/types/entities/finance-status";
import { FinanceWalletShort } from "@/types/entities/finance-wallet";
import { FinanceItemRepeat } from "@/types/entities/finance-item"

const url = '/v1/finance/item'

export class FinanceItemGeteway {
  constructor(private request: AxiosStatic) { }

  async page(search: IPageProps) {
    const q = $utils.queryString({
      _paginate: true,
      _q: search.query,
      _limit: search.limit,
      page: search.page,
      enable: search.enable,
      status_id: search.statusId,
      type_id: search.typeId,
      origin_id: search.originId,
      wallet_id: search.walletId,
      tag_ids: search.tagIds,
      type_preveiw: search.typePreveiw,
      period: search.period,
    })

    const result = await this.request.get<PageResponse<IDataResponse>>(url + q)

    return {
      ...result,
      data: pageParseResponse(result.data)
    }
  }
  async id(id: number) {
    const result = await this.request.get<IDataResponse>(`${url}/${id}`)

    return {
      ...result,
      data: dataParseResponse(result.data)
    }
  }
  async post(form: IPostProps) {
    if (form.obs === '') {
      delete form.obs
    }

    return await this.request.post<{ message: string }>(url, {
      ...form,
      origin_id: form.originId,
      status_id: form.statusId,
      tagIds: form.tagIds,
      type_id: form.typeId,
      wallet_id: form.walletId,
    })
  }
  async put(id: number, form: IPutProps) {
    if (form.obs === '') {
      delete form.obs
    }

    return await this.request.put<{ message: string }>(`${url}/${id}`, {
      ...form,
      origin_id: form.originId,
      status_id: form.statusId,
      tagIds: form.tagIds,
      type_id: form.typeId,
      wallet_id: form.walletId,
    })
  }
  async remove(id: number) {
    return await this.request.delete<{ message: string }>(`${url}/${id}`)
  }
  async enabled(id: number) {
    return await this.request.get<{ message: string }>(`${url}/${id}/enabled`)
  }
  async disabled(id: number) {
    return await this.request.get<{ message: string }>(`${url}/${id}/disabled`)
  }
  async status(id: number, statusId: FinanceStatusId) {
    return await this.request.get(`v1/finance/item/${id}/status/${statusId}`)
  }
}
interface IPageProps {
  query?: string
  limit?: _limitApi
  page?: number
  enable?: Enable
  statusId?: FinanceStatusId | null
  typeId?: FinanceTypeId | null
  originId?: number | null
  walletId: number | null
  tagIds?: number[] | null
  typePreveiw?: FinanceExtractTypePreveiw
  period: string
}
interface IPostProps {
  value: number
  date: string
  sort: number
  enable: Enable
  obs?: string
  originId: number
  statusId: FinanceStatusId
  tagIds: number[]
  typeId: FinanceTypeId
  walletId: number
  repeat: FinanceItemRepeat
}
interface IPutProps {
  value: number
  date: string
  sort: number
  enable: Enable
  obs?: string
  originId: number
  statusId: FinanceStatusId
  tagIds: number[]
  typeId: FinanceTypeId
  walletId: number
  repeat: FinanceItemRepeat
}
interface IDataResponse {
  id: number
  value: number
  date: string
  sort: number
  enable: Enable
  obs: string
  origin: FinanceOriginShort,
  status: FinanceStatus
  tag_ids: FinanceTagShort[]
  type: FinanceType
  wallet: FinanceWalletShort
  createdAt: string
  updatedAt: string
}
const dataParseResponse = (data: IDataResponse) => ({
  id: data.id,
  value: data.value,
  date: data.date,
  sort: data.sort,
  enable: data.enable,
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
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
})
const pageParseResponse = (data: PageResponse<IDataResponse>) => ({
  items: data.items.map(dataParseResponse),
  page: data.page,
  total: data.total,
  limit: data.limit,
  lastPage: data.lastPage,
})