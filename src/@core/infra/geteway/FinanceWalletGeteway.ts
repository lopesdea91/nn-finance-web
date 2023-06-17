import { AxiosStatic } from "axios";
import { FinanceWallet } from "@/types/entities/finance-wallet";
import { $utils } from "@/utils";
import { PageResponse } from "@/types/request";
import { Enable, _limitApi } from "@/types/enum";

let url = '/v1/finance/wallet'

export class FinanceWalletGeteway {
  constructor(private request: AxiosStatic) { }

  async page(search: IPageProps = {}) {
    const queryString = $utils.queryString({
      _paginate: true,
      _q: search?.query,
      _limit: search?.limit,
      page: search?.page,
      enable: search?.enable,
      panel: search?.panel,
    })

    const result = await this.request.get<PageResponse<IDataResponse>>(`${url}${queryString}`)

    return {
      ...result,
      data: pageParseResponse(result.data)
    }
  }
  async get(search: IGetProps = {}) {
    const queryString = $utils.queryString({
      enable: search?.enable,
      panel: search?.panel,
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
    })
  }
  async put(id: number, form: IPutProps) {
    return await this.request.put<{ message: string }>(`${url}/${id}`, {
      ...form,
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

  // 

  async periodsData(walletId: number) {
    const queryString = $utils.queryString({ wallet_id: walletId })

    const result = await this.request.get<IPeriodsDataResponse[]>(`${url}/periods-data${queryString}`)

    return {
      ...result,
      data: periodsDataParse(result.data)
    }
  }

  async composition(form: IConsolidationProps) {
    return await this.request.post<{ message: string }>(`${url}-composition`, {
      wallet_id: form.walletId,
      composition: form.composition.map(el => ({
        tag_id: el.tagId,
        percentage_limit: el.percentageLimit
      }))
    })
  }

  // consolidate
  // async consolidateMonth({ period, wallet_id }: { period: string, wallet_id: number }) {
  //   let error = null
  //   let code = 200
  //   let status = false
  //   let data: FinanceWalletConsolidateMonth = {
  //     balance: {
  //       available: '0',
  //       estimate: '0',
  //       expense: '0',
  //       revenue: '0'
  //     },
  //     composition: [],
  //     originTransactional: [],
  //     invoice: [],
  //     tag: [],
  //     status: [],
  //   }

  //   try {
  //     const result = await this.request.get<FinanceWalletConsolidateMonthResponse>(`${url}/consolidate-month${$utils.queryString({ period, wallet_id })}`)

  //     code = result.status
  //     status = true

  //     if (result.status === 200) {
  //       result.data.balance.available = Number(result.data.balance.available).toFixed(2)
  //       result.data.balance.estimate = Number(result.data.balance.estimate).toFixed(2)
  //       result.data.balance.expense = Number(result.data.balance.expense).toFixed(2)
  //       result.data.balance.revenue = Number(result.data.balance.revenue).toFixed(2)

  //       data.balance = result.data.balance
  //       data.composition = result.data.composition.map(el => {
  //         return {
  //           tag_id: el.tag_id,
  //           tag_description: '',
  //           percentage: el.percentage,
  //           percentage_current: el.percentage_current,
  //           value: Number(el.value).toFixed(2)
  //         }
  //       })
  //       data.originTransactional = result.data.originTransactional.map(el => {
  //         el.sum = Number(el.sum).toFixed(2)
  //         return el
  //       })
  //       data.invoice = result.data.invoice
  //       data.tag = result.data.tag.map(el => {
  //         const n = Number(el.sum).toFixed(2)
  //         el.sum = el.type_id === 1 ? n : `-${n}`

  //         return el
  //       })
  //       data.status = result.data.status.map(el => {
  //         return el
  //       })
  //     }
  //   }
  //   catch (err) {
  //     console.log('... err', err);

  //     error = err
  //   }

  //   return { error, code, status, data }
  // }
  // async processConsolidateMonth(form: { period: string, wallet_id: number }) {
  //   let error = null
  //   let code = 200
  //   let status = false
  //   let data: { message: string } = {
  //     message: ''
  //   }

  //   try {
  //     const result = await this.request.post<{ message: string }>(`${url}/consolidate-month`, form)

  //     code = result.status
  //     status = true

  //     if (result.status === 200) {
  //       data.message
  //     }
  //   }
  //   catch (err) {
  //     error = err
  //   }

  //   return { error, code, status, data }
  // }
  // async consolidateComposition(form: { period: string, wallet_id: number, composition: string }) {
  //   let error = null
  //   let code = 200
  //   let status = false
  //   let data: { message: string } = {
  //     message: ''
  //   }

  //   try {
  //     const result = await this.request.post<{ message: string }>(`${url}/consolidate-month/composition`, form)

  //     code = result.status
  //     status = true

  //     if (result.status === 200) {
  //       data.message
  //     }
  //   }
  //   catch (err) {
  //     error = err
  //   }

  //   return { error, code, status, data }
  // }
}

interface IDataResponse {
  id: number
  description: string
  enable: Enable
  panel: Enable
}
interface IPageProps {
  query?: string
  limit?: _limitApi
  page?: number
  enable?: Enable
  panel?: number
}
interface IGetProps {
  enable?: Enable
  panel?: number
}
interface IPostProps {
  description: string,
}
interface IPutProps {
  description: string,
  enable: Enable,
  panel: Enable
}
interface IPeriodsDataResponse {
  period: string
  year: string
  month: string
  label: string
}
interface IPeriodsData {
  year: string
  periods: {
    label: string
    period: string
  }[]
}
interface IConsolidationProps {
  walletId: number
  composition: { tagId: number, percentageLimit: number }[]
}

const dataParseResponse = (data: IDataResponse): FinanceWallet => ({
  id: data.id,
  description: data.description,
  enable: data.enable,
  panel: data.panel
})
const pageParseResponse = (data: PageResponse<IDataResponse>) => ({
  items: data.items.map(dataParseResponse),
  page: data.page,
  total: data.total,
  limit: data.limit,
  lastPage: data.lastPage,
})
const periodsDataParse = (data: IPeriodsDataResponse[]) => {
  return data
  // return data.reduce((acc, el) => {
  //   const { label, month, period, year } = el

  //   const check = !!acc.find(el => el.year === year)

  //   if (!check) {
  //     acc.push({
  //       year,
  //       periods: []
  //     })
  //   }

  //   acc.map(item => {
  //     if (item.year === year) {
  //       item.periods.push({
  //         label, period
  //       })
  //     }

  //     return item
  //   })

  //   return acc
  // }, [] as IPeriodsData[])
}