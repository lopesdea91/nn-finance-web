import { AxiosStatic } from "axios";
import { ApiPageResponse } from "@/services/api";
import { FinanceWallet, FinanceWalletConsolidateMonth, FinanceWalletConsolidateMonthPayload, FinanceWalletConsolidateMonthResponse, FinanceWalletPeriodsData, FinanceWalletPeriodsDataPayload, FinanceWalletPeriodsDataResponse, FinanceWalletProcessConsolidateMonthPayload, FinanceWalletProcessConsolidateMonthResponse, FinanceWalletSearch } from "@/types/entities/finance-wallet";
import { FinanceWalletFormFieldsPost, FinanceWalletFormFieldsPut } from "@/types/form/settingsFinanceWallet";
import { $utils } from "@/utils";

let url = '/v1/finance/wallet'

export class FinanceWalletGeteway {
  constructor(private request: AxiosStatic) { }

  async page(search: Partial<FinanceWalletSearch> = {}) {
    let error = null
    let code = 200
    let status = false

    let data: ApiPageResponse<FinanceWallet> = {
      items: [],
      page: 1,
      total: 0,
      limit: 15,
      lastPage: 0,
    }

    try {
      const q = $utils.queryString({ _paginate: true, ...search })

      const result = await this.request.get<ApiPageResponse<FinanceWallet>>(url + q)

      code = result.status
      status = true

      if (result.status === 200) {
        data.items = result.data.items
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
  async get(search: Partial<FinanceWalletSearch> = {}) {
    let error = null
    let code = 200
    let status = false
    let data: FinanceWallet[] | null = null

    try {
      const q = $utils.queryString(search)

      const result = await this.request.get<FinanceWallet[]>(url + q)

      code = result.status
      status = true

      if (result.status === 200) {
        data = result.data
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
    let data: FinanceWallet | null = null

    try {
      const result = await this.request.get<FinanceWallet>(`${url}/${id}`)

      code = result.status
      status = true

      if (result.status === 200) {
        data = result.data
      }
    } catch (err) {
      error = err
      code = 500
      status = false
    }

    return { error, code, status, data }
  }
  async post(form: FinanceWalletFormFieldsPost) {
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
  async put(id: number, form: FinanceWalletFormFieldsPut) {
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

  // 

  async consolidateMonth({ period, wallet_id }: FinanceWalletConsolidateMonthPayload) {
    let error = null
    let code = 200
    let status = false
    let data: FinanceWalletConsolidateMonth = {
      balance: {
        available: '0',
        estimate: '0',
        expense: '0',
        revenue: '0'
      },
      composition: [],
      originTransactional: [],
      invoice: [],
      tag: [],
      status: [],
    }

    try {
      const result = await this.request.get<FinanceWalletConsolidateMonthResponse>(`${url}/consolidate-month${$utils.queryString({ period, wallet_id })}`)

      code = result.status
      status = true

      if (result.status === 200) {
        result.data.balance.available = Number(result.data.balance.available).toFixed(2)
        result.data.balance.estimate = Number(result.data.balance.estimate).toFixed(2)
        result.data.balance.expense = Number(result.data.balance.expense).toFixed(2)
        result.data.balance.revenue = Number(result.data.balance.revenue).toFixed(2)

        data.balance = result.data.balance
        data.composition = result.data.composition
        data.originTransactional = result.data.originTransactional.map(el => {
          el.sum = Number(el.sum).toFixed(2)
          return el
        })
        data.invoice = result.data.invoice
        data.tag = result.data.tag.map(el => {
          const n = Number(el.sum).toFixed(2)
          el.sum = el.type_id === 1 ? n : `-${n}`

          return el
        })
        data.status = result.data.status.map(el => {
          return el
        })
      }
    }
    catch (err) {
      console.log('... err', err);

      error = err
    }

    return { error, code, status, data }
  }
  async processConsolidateMonth(form: FinanceWalletProcessConsolidateMonthPayload) {
    let error = null
    let code = 200
    let status = false
    let data: FinanceWalletProcessConsolidateMonthResponse = {
      message: ''
    }

    try {
      const result = await this.request.post<FinanceWalletProcessConsolidateMonthResponse>(`${url}/consolidate-month`, form)

      code = result.status
      status = true

      if (result.status === 200) {
        data.message
      }
    }
    catch (err) {
      error = err
    }

    return { error, code, status, data }
  }
  async periodsData({ wallet_id, format }: FinanceWalletPeriodsDataPayload) {
    let error = null
    let code = 200
    let status = false
    let data: FinanceWalletPeriodsData[] = []

    try {
      const result = await this.request.get<FinanceWalletPeriodsDataResponse>(`${url}/periods-data${$utils.queryString({ wallet_id, format })}`)

      code = result.status
      status = true

      if (result.status === 200) {
        data = result.data.items
      }
    }
    catch (err) {
      error = err
    }

    return { error, code, status, data }
  }
}