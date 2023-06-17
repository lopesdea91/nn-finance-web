import { AxiosStatic } from "axios";
import { FinanceTag } from "@/types/entities/finance-tag";
import { $utils } from "@/utils";
import { Enable, FinanceTypeId, _limitApi } from "@/types/enum";
import { PageResponse } from "@/types/request";
import { FinanceType } from "@/types/entities/finance-type";
import { FinanceWalletShort } from "@/types/entities/finance-wallet";

const url = '/v1/finance/tag'

export class FinanceTagGeteway {
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
    })

    const result = await this.request.get<PageResponse<IDataResponse>>(`${url}${queryString}`)

    return {
      ...result,
      data: pageParseResponse(result.data)
    }
  }
  async get(search: IGetProps = {}) {
    const queryString = $utils.queryString({
      _paginate: true,
      _q: search?.query,
      _limit: search?.limit,
      page: search?.page,
      enable: search?.enable,
      type_id: search?.typeId,
      wallet_id: search?.walletId,
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
      description: form.description,
      enable: form.enable,
      type_id: form.typeId,
      wallet_id: form.walletId,
    })
  }
  async put(id: number, form: IPutProps) {
    return await this.request.put<{ message: string }>(`${url}/${id}`, {
      description: form.description,
      enable: form.enable,
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
}
interface IDataResponse {
  id: number
  description: string
  enable: Enable
  type: FinanceType
  wallet: FinanceWalletShort
  createdAt: string
  updatedAt: string
}
interface IPageProps {
  query?: string
  limit?: _limitApi
  page?: number
  enable?: Enable
  typeId?: FinanceTypeId
  walletId?: number
};
interface IGetProps {
  query?: string
  limit?: _limitApi
  page?: number
  enable?: Enable
  typeId?: FinanceTypeId
  walletId?: number
};
interface IPostProps {
  description: string
  enable: Enable
  typeId: FinanceTypeId
  walletId: number
}
interface IPutProps {
  description: string
  enable: Enable
  typeId: FinanceTypeId
  walletId: number
}
const dataParseResponse = (data: IDataResponse): FinanceTag => {
  return {
    id: data.id,
    description: data.description,
    enable: data.enable as Enable,
    type: data.type,
    typeId: data.type?.id as number,
    wallet: data.wallet,
    walletId: data.wallet?.id as number,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  }
}
const pageParseResponse = (data: PageResponse<IDataResponse>) => ({
  items: data.items.map(dataParseResponse),
  page: data.page,
  total: data.total,
  limit: data.limit,
  lastPage: data.lastPage,
})