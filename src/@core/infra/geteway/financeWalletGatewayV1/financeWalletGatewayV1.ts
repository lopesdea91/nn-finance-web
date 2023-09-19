import { IFinanceWallet } from '@/@core/domain/entities/finance-wallet'
import { _SortApi, _limitApi } from '@/types/enum'
import { httpPrepareUrl, httpParseParams, httpFilterParams, httpParsePage } from '@/@core/utils'
import IHttpResponsePage from '../../http/HttpResponsePage'
import IHttpClient from '../../http/httpClient'

let url = '/v1/finance/wallet'

export const financeWalletGatewayV1 = (http: IHttpClient) => ({
  page: async (search: IPageProps = {}) => {
    const searchParsed = {
      _paginate: true,
      _q: search?.query,
      _limit: search?.limit,
      page: search?.page,
      sort: search?.sort,
      order: search?.order,
      panel: search?.panel,
      deleted: search?.deleted
    }

    const url = httpPrepareUrl({
      url: '/v1/finance/wallet',
      queryString: httpParseParams(httpFilterParams(searchParsed))
    })

    const { status, data } = await http.get<IHttpResponsePage<IDataResponse>>(url)

    let dataParsed = httpParsePage(data)

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
      panel: search?.panel,
      deleted: search?.deleted
    }

    const url = httpPrepareUrl({
      url: '/v1/finance/wallet',
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
      url: '/v1/finance/wallet',
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
      url: '/v1/finance/wallet'
    })

    const { status, data } = await http.post<{ message: string }>(url, {
      description: form.description
    })

    return { status, data }
  },
  put: async (id: number, form: IPutProps) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/wallet',
      id
    })

    const { status, data } = await http.put<{ message: string }>(url, {
      description: form.description,
      panel: form.panel
    })

    return { status, data }
  },
  remove: async (id: number) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/wallet',
      id
    })

    return await http.delete(url)
  },
  restore: async (id: number) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/wallet-restore',
      id
    })

    return await http.get<{ message: string }>(url)
  },
  //
  periodsData: async (walletId: number) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/wallet-dataPeriods',
      queryString: httpParseParams({
        wallet_id: walletId
      })
    })

    const { status, data } = await http.get<IPeriodsDataResponse[]>(url)

    return {
      status,
      data: status === 200 ? periodsDataParse(data) : []
    }
  },
  getComposition: async ({ walletId }: IGetConsolidationProps) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/wallet-composition',
      queryString: httpParseParams({
        wallet_id: walletId
      })
    })

    const { status, data } = await http.get<ICompositionDataResponse[]>(url)

    return {
      status,
      data: status === 200 ? data.map(compositionDataParse) : []
    }
  },
  updateComposition: async (form: IUpdateConsolidationProps) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/wallet-composition'
    })

    const { status, data } = await http.put<{ message: string }>(url, {
      wallet_id: form.walletId,
      composition: form.composition.map((el) => ({
        tag_id: el.tagId,
        percentage_limit: el.percentageLimit
      }))
    })

    return { status, data }
  },
  removeComposition: async ({ compositionId, walletId }: IRemoveConsolidationProps) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/wallet-composition',
      id: compositionId,
      queryString: httpParseParams({
        wallet_id: walletId
      })
    })

    const { status } = await http.delete(url)

    return { status }
  }
})

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
//     const result = await http.get<FinanceWalletConsolidateMonthResponse>(`${url}/consolidate-month${$utils.queryString({ period, wallet_id })}`)

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
//     const result = await http.post<{ message: string }>(`${url}/consolidate-month`, form)

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
//     const result = await http.post<{ message: string }>(`${url}/consolidate-month/composition`, form)

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

interface IDataResponse {
  id: number
  description: string
  panel: 1 | 0
  trashed: 1 | 0
}
interface IPageProps {
  query?: string
  limit?: _limitApi
  page?: number
  sort?: _SortApi
  order?: 'id' | 'description'
  panel?: number
  deleted?: 1
}
interface IGetProps {
  panel?: number
  deleted?: 1
}
interface IPostProps {
  description: string
}
interface IPutProps {
  description: string
  panel: 1 | 0
}
interface IPeriodsDataResponse {
  period: string
  year: string
  month: string
  label: string
}
interface ICompositionDataResponse {
  id: number
  percentage_limit: number
  tag_id: number
  wallet_id: number
}
interface IPeriodsData {
  year: string
  periods: {
    label: string
    period: string
  }[]
}
interface IGetConsolidationProps {
  walletId: number
}
interface IUpdateConsolidationProps {
  walletId: number
  composition: { tagId: number; percentageLimit: number }[]
}
interface IRemoveConsolidationProps {
  compositionId: number
  walletId: number
}

const dataParseResponse = (data: IDataResponse): IFinanceWallet => ({
  id: data.id,
  description: data.description,
  panel: data.panel,
  trashed: data.trashed
})
const periodsDataParse = (data: IPeriodsDataResponse[]) => {
  return data.reduce(
    (acc, item) => {
      const exist = acc.find((el) => el.year === item.year)

      if (!exist) {
        acc.push({
          year: item.year,
          months: []
        })
      }

      acc.map((el) => {
        el.months.push({
          label: item.label.replace('-', '/'),
          period: item.period
        })
        return el
      })

      return acc
    },
    [] as {
      year: string
      months: { period: string; label: string }[]
    }[]
  )
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
const compositionDataParse = (data: ICompositionDataResponse) => ({
  id: data.id,
  percentageLimit: data.percentage_limit,
  tagId: data.tag_id,
  walletId: data.wallet_id
})
