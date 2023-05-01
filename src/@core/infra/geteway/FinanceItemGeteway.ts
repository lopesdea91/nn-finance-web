import { AxiosError, AxiosStatic } from "axios";
import { ApiPageResponse } from "@/services/api";
import { FinanceExtractFormSearchFields } from "@/types/form/financeExtract";
import { FinanceItemFormFieldsPost, FinanceItemFormFieldsPut } from "@/types/form/financeItem";
import { FinanceItem } from "@/types/entities/finance-item";
import { FinanceStatusId } from "@/types/enum";
import { $utils } from "@/utils";

const url = '/v1/finance/item'

export class FinanceItemGeteway {
  constructor(private request: AxiosStatic) { }

  async page(search: Partial<FinanceExtractFormSearchFields> = {}) {
    const q = $utils.queryString({ _paginate: true, ...search })

    let error = null
    let code = 200
    let status = true
    let data: ApiPageResponse<FinanceItem> = {
      items: [],
      page: 1,
      total: 0,
      limit: 15,
      lastPage: 0,
    }

    try {
      const result = await this.request.get<ApiPageResponse<FinanceItem>>(url + q)

      code = result.status

      if (result.status === 200) {
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
  async id(id: number) {
    let error = null
    let code = 200
    let status = true
    let data: FinanceItem | null = null

    try {
      const result = await this.request.get<FinanceItem>(`${url}/${id}`)

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
  async post(form: FinanceItemFormFieldsPost) {
    let error = null
    let code = 201
    let status = true
    let data: { message: string } = { message: '' }

    if (form.obs === '') {
      delete form.obs
    }

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
  async put(id: number, form: FinanceItemFormFieldsPut) {
    let error = null
    let code = 201
    let status = true
    let data: { message: string } = { message: '' }

    if (form.obs === '') {
      delete form.obs
    }

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
      status = true

    } catch (err) {
      error = (err as AxiosError).response?.data
      code = (err as AxiosError).response?.status as number
      status = false
    }

    return { error, code, status }
  }
  async status<R>(id: number, statusId: FinanceStatusId) {
    let error = null
    let code = 200
    let status = true

    try {
      const result = await this.request.get(`v1/finance/item/${id}/status/${statusId}`)

      code = result.status
      status = true

    } catch (err) {
      error = (err as AxiosError).response?.data
      code = (err as AxiosError).response?.status as number
      status = false
    }

    return { error, code, status }
  }

  private parseResponse(data: FinanceItem): FinanceItem {
    return {
      id: data.id,
      value: data.value,
      date: data.date,
      sort: data.sort,
      enable: data.enable,
      obs: data.obs,
      origin: data.origin,
      status: data.status,
      tag_ids: data.tag_ids,
      type: data.type,
      wallet: data.wallet,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }
  }
}