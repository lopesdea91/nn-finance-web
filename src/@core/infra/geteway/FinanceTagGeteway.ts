import { AxiosError, AxiosStatic } from "axios";
import { FinanceTag, FinanceTagResponse, FinanceTagSearch } from "@/types/entities/finance-tag";
import { FinanceTagFormFieldsPost, FinanceTagFormFieldsPut } from "@/types/form/settingsFinanceTag";
import { $utils } from "@/utils";
import { Enable } from "@/types/enum";
import { PageResponse } from "@/types/request";

const url = '/v1/finance/tag'

export class FinanceTagGeteway {
  constructor(private request: AxiosStatic) { }

  async page(search: Partial<FinanceTagSearch> = {}) {

    const q = $utils.queryString({ _paginate: true, ...search })

    let error = null
    let code = 200
    let status = true
    let data: PageResponse<FinanceTag> = {
      items: [],
      page: 1,
      total: 0,
      limit: 15,
      lastPage: 0,
    }

    try {
      const result = await this.request.get<PageResponse<FinanceTagResponse>>(url + q)

      code = result.status

      if (code === 200) {
        data.items = result.data.items.map(this.parseResponse)
        data.page = result.data.page
        data.total = result.data.total
        data.limit = result.data.limit
        data.lastPage = result.data.lastPage
      }
    } catch (err) {
      error = (err as AxiosError).response?.data
      code = (err as AxiosError).response?.status as number
      status = false
    }

    return { error, code, status, data }
  }
  async get(search: Partial<FinanceTagSearch> = {}) {
    let error = null
    let code = 200
    let status = true
    let data: FinanceTag[] | null = null

    try {
      const q = $utils.queryString(search)

      const result = await this.request.get<FinanceTagResponse[]>(url + q)

      code = result.status

      if (code === 200) {
        data = result.data.map(this.parseResponse)
      }
    } catch (err) {
      error = (err as AxiosError).response?.data
      code = (err as AxiosError).response?.status as number
      status = false
    }

    return { error, code, status, data }
  }
  async id(id: number) {
    let error = null
    let code = 200
    let status = true
    let data: FinanceTag | null = null

    try {
      const result = await this.request.get<FinanceTagResponse>(`${url}/${id}`)

      code = result.status

      if (code === 200) {
        data = this.parseResponse(result.data)
      }
    } catch (err) {
      error = (err as AxiosError).response?.data
      code = (err as AxiosError).response?.status as number
      status = false
    }

    return { error, code, status, data }
  }
  async post(form: FinanceTagFormFieldsPost) {
    let error = null
    let code = 201
    let status = true
    let data: { message: string } = { message: '' }

    try {
      const result = await this.request.post<{ message: string }>(url, form)

      code = result.status

      if (code === 201) {
        data = result.data
      }

    } catch (err) {
      error = (err as AxiosError).response?.data
      code = (err as AxiosError).response?.status as number
      status = false
    }

    return { error, code, status, data }
  }
  async put(id: number, form: FinanceTagFormFieldsPut) {
    let error = null
    let code = 201
    let status = true
    let data: { message: string } = { message: '' }

    try {
      const result = await this.request.put<{ message: string }>(`${url}/${id}`, form)

      code = result.status

      if (code === 201) {
        data = result.data
      }

    } catch (err) {
      error = (err as AxiosError).response?.data
      code = (err as AxiosError).response?.status as number
      status = false
    }

    return { error, code, status, data }
  }
  async remove(id: number) {
    let error = null
    let code = 204
    let status = true

    try {
      const result = await this.request.delete<{ message: string }>(`${url}/${id}`)

      code = result.status

    } catch (err) {
      error = (err as AxiosError).response?.data
      code = (err as AxiosError).response?.status as number
      status = false
    }

    return { error, code, status }
  }
  async enabled(id: number) {
    let error = null
    let code = 200
    let status = true

    try {
      const result = await this.request.get<{ message: string }>(`${url}/${id}/enabled`)

      code = result.status

    } catch (err) {
      error = (err as AxiosError).response?.data
      code = (err as AxiosError).response?.status as number
      status = false
    }

    return { error, code, status }
  }
  async disabled(id: number) {
    let error = null
    let code = 200
    let status = true

    try {
      const result = await this.request.get<{ message: string }>(`${url}/${id}/disabled`)

      code = result.status

    } catch (err) {
      error = (err as AxiosError).response?.data
      code = (err as AxiosError).response?.status as number
      status = false
    }

    return { error, code, status }
  }
  private parseResponse(data: FinanceTagResponse): FinanceTag {
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
}