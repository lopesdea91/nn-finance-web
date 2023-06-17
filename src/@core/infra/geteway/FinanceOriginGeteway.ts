import { AxiosStatic } from "axios";
import { FinanceOrigin, FinanceOriginShort } from "@/types/entities/finance-origin";
import { $utils } from "@/utils";
import { Enable, _limitApi } from "@/types/enum";
import { PageResponse } from "@/types/request";
import { FinanceType } from "@/types/entities/finance-type";
import { FinanceWalletShort } from "@/types/entities/finance-wallet";

const url = '/v1/finance/origin'

export class FinanceOriginGeteway {
  constructor(private request: AxiosStatic) { }

  async page(search: IPageProps = {}) {
    const queryString = $utils.queryString({
      _paginate: true,
      _q: search?.query,
      _limit: search?.limit,
      page: search?.page,
      enable: search?.enable,
      type_id: search?.typeId,
      wallet_id: search?.walletId,
      parent_id: search?.parentId,
    })

    const result = await this.request.get<PageResponse<IDataResponse>>(`${url}${queryString}`)

    return {
      ...result,
      data: pageParseResponse(result.data)
    }
  }
  async get(search: IGetProps = {}) {
    const queryString = $utils.queryString({
      _q: search?.query,
      _limit: search?.limit,
      page: search?.page,
      enable: search?.enable,
      type_id: search?.typeId,
      wallet_id: search?.walletId,
      parent_id: search?.parentId,
    })

    const result = await this.request.get<IDataResponse[]>(`${url}${queryString}`)

    return {
      ...result,
      data: result.data.map(dataParseResponse)
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
    return await this.request.post<{ message: string }>(url, {
      ...form,
      type_id: form.typeId,
      wallet_id: form.walletId,
      parent_id: form.parentId,
    })
  }
  async put(id: number, form: IPutProps) {
    return await this.request.put<{ message: string }>(`${url}/${id}`, {
      ...form,
      type_id: form.typeId,
      wallet_id: form.walletId,
      parent_id: form.parentId,
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
}
interface IDataResponse {
  id: number
  description: string
  enable: Enable
  type: FinanceType
  type_id: number
  wallet: FinanceWalletShort
  wallet_id: number
  parent: FinanceOriginShort | null
  parent_id: number | null
  createdAt: string
  updatedAt: string
}
interface IPageProps {
  query?: string
  limit?: _limitApi
  page?: number
  enable?: Enable
  typeId?: number[] | null
  walletId?: number | null
  parentId?: number | null
}
interface IGetProps {
  query?: string
  limit?: _limitApi
  page?: number
  enable?: Enable
  typeId?: number[] | null
  walletId?: number | null
  parentId?: number | null
}
interface IPostProps {
  // id: number | null
  description: string
  enable: Enable
  typeId: number | null
  // type?: FinanceType
  walletId: number | null
  // wallet?: FinanceWalletShort
  parentId: number | null
}
interface IPutProps {
  // id: number | null
  description: string
  enable: Enable
  typeId: number | null
  // type?: FinanceType
  walletId: number | null
  // wallet?: FinanceWalletShort
  parentId: number | null
}
const dataParseResponse = (data: IDataResponse): FinanceOrigin => ({
  id: data.id,
  description: data.description,
  enable: data.enable,
  type: data.type,
  typeId: data.type.id,
  wallet: data.wallet,
  walletId: data.wallet.id,
  parent: data.parent,
  parentId: data.parent?.id || null,
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