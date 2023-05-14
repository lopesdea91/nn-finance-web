import { AxiosStatic } from "axios";
import { FinanceOrigin, FinanceOriginSearch } from "@/types/entities/finance-origin";
import { FinanceOriginFormFieldsPost, FinanceOriginFormFieldsPut } from "@/types/form";
import { $utils } from "@/utils";
import { Enable } from "@/types/enum";
import { PageResponse } from "@/types/request";

let url = '/v1/finance/origin'

export class FinanceOriginGeteway {
  constructor(private request: AxiosStatic) { }

  async page(search: Partial<FinanceOriginSearch> = {}) {
    let error = null
    let code = 200
    let status = false

    let data: PageResponse<FinanceOrigin> = {
      items: [],
      page: 1,
      total: 0,
      limit: 15,
      lastPage: 0,
    }

    try {
      const q = $utils.queryString({ _paginate: true, ...search })

      const result = await this.request.get<PageResponse<FinanceOrigin>>(url + q)

      code = result.status
      status = true

      if (result.status === 200) {
        data.items = result.data.items.map(this.parseResponse)
        data.page = result.data.page
        data.total = result.data.total
        data.limit = result.data.limit
        data.lastPage = result.data.lastPage
      }
    } catch (err) {
      error = err
    }

    return { error, code, status, data }
  }
  async get(search: Partial<FinanceOriginSearch> = {}) {
    let error = null
    let code = 200
    let status = false
    let data: FinanceOrigin[] | null = null

    try {
      const q = $utils.queryString(search)

      const result = await this.request.get<FinanceOrigin[]>(url + q)

      code = result.status
      status = true

      if (result.status === 200) {
        data = result.data.map(this.parseResponse)
      }
    } catch (err) {
      error = err
      code = 500
      status = false
    }

    return { error, code, status, data }
  }
  async id(id: number) {
    let error = null
    let code = 200
    let status = false
    let data: FinanceOrigin | null = null

    try {
      const result = await this.request.get<FinanceOrigin>(`${url}/${id}`)

      code = result.status
      status = true

      if (result.status === 200) {
        data = this.parseResponse(result.data)
      }
    } catch (err) {
      error = err
      code = 500
      status = false
    }

    return { error, code, status, data }
  }
  async post(form: FinanceOriginFormFieldsPost) {
    let error = null
    let code = 201
    let status = true
    let data: { message: string } = { message: '' }

    try {
      const result = await this.request.post<{ message: string }>(url, form)

      code = result.status
      status = true

      if (result.status === 201) {
        data = result.data
      }

    } catch (err) {
      error = err
      code = 500
      status = false
    }

    return { error, code, status, data }
  }
  async put(id: number, form: FinanceOriginFormFieldsPut) {
    let error = null
    let code = 201
    let status = true
    let data: { message: string } = { message: '' }

    try {
      const result = await this.request.put<{ message: string }>(`${url}/${id}`, form)

      code = result.status
      status = true

      if (result.status === 201) {
        data = result.data
      }

    } catch (err) {
      error = err
      code = 500
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
      status = true

    } catch (err) {
      error = err
      code = 500
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
      status = true

    } catch (err) {
      error = err
      code = 500
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
      error = err
      code = 500
      status = false
    }

    return { error, code, status }
  }

  private parseResponse(data: FinanceOrigin): FinanceOrigin {
    return {
      id: data.id,
      description: data.description,
      enable: +data.enable as Enable,
      parent: data.parent,
      parentId: data.parent ? +data.parent.id : null,
      type: data.type,
      typeId: +data.type?.id as number,
      wallet: data.wallet,
      walletId: +data.wallet?.id,
    }
  }
}