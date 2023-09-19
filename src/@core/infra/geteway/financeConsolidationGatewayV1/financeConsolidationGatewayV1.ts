import { httpParseParams, httpPrepareUrl } from '@/@core/utils'
import IHttpClient from '../../http/httpClient'
import {
  IFinanceConsolidationMonthBalance,
  IFinanceConsolidationMonthComposition,
  IFinanceConsolidationMonthOriginCredit,
  IFinanceConsolidationMonthOriginTransactional
} from '@/@core/domain/entities/finance-wallet-consolidation'

export const financeConsolidationGatewayV1 = (http: IHttpClient) => ({
  processMonth: async (form: IProcessMonthProps) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/wallet-consolidation/month'
    })

    const { status, data } = await http.post<{ message: string }>(url, {
      period: form.period,
      wallet_id: form.walletId
    })

    return { status, data }
  },
  createMonthComposition: async (form: ICreateMonthComposition) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/wallet-consolidation/month-composition'
    })

    const body = createMonthCompositionParseRequest(form)

    const { status, data } = await http.post<{ message: string }>(url, body)

    return { status, data }
  },
  updateMonthComposition: async (form: IUpdateMonthComposition) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/wallet-consolidation/month-composition'
    })

    const body = updateMonthCompositionParseRequest(form)

    const { status, data } = await http.put<{ message: string }>(url, body)

    return { status, data }
  },
  removeMonthComposition: async ({ consolidationId, compositionId }: IDeleteMonthComposition) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/wallet-consolidation/month-composition',
      id: compositionId,
      queryString: httpParseParams({
        consolidation_id: consolidationId
      })
    })

    const { status, data } = await http.delete(url)

    return { status, data }
  },
  // month
  monthConsolidation: async ({ period, walletId }: IConsolidationProps) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/wallet-consolidation/month',
      queryString: httpParseParams({
        period: period,
        wallet_id: walletId
      })
    })

    const { status, data } = await http.get<IConsolidationResponse>(url)

    const dataParsed = consolidationParseResponse(status === 200 ? data : ({} as IConsolidationResponse))

    return {
      status,
      data: dataParsed
    }
  },
  monthBalance: async ({ consolidationId, walletId }: IDataProps) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/wallet-consolidation/month-data',
      queryString: httpParseParams({
        consolidation_id: consolidationId,
        wallet_id: walletId,
        data: 'balance'
      })
    })

    const { status, data } = await http.get<IBalanceResponse>(url)

    const dataParsed = monthBalanceParseResponse(status === 200 ? data : ({} as IBalanceResponse))

    return {
      status,
      data: dataParsed
    }
  },
  monthComposition: async ({ consolidationId, walletId }: IDataProps) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/wallet-consolidation/month-data',
      queryString: httpParseParams({
        consolidation_id: consolidationId,
        wallet_id: walletId,
        data: 'composition'
      })
    })

    const { status, data } = await http.get<ICompositionResponse[]>(url)

    const dataParsed = monthCompositionParseResponse(status === 200 ? data : [])

    return {
      status,
      data: dataParsed
    }
  },
  monthOriginTransactional: async ({ consolidationId, walletId }: IDataProps) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/wallet-consolidation/month-data',
      queryString: httpParseParams({
        consolidation_id: consolidationId,
        wallet_id: walletId,
        data: 'origin_transactional'
      })
    })

    const { status, data } = await http.get<IOriginTransactionalResponse[]>(url)

    const dataParsed = monthOriginTransactionalParseResponse(status === 200 ? data : [])

    return {
      status,
      data: dataParsed
    }
  },
  monthOriginCredit: async ({ consolidationId, walletId }: IDataProps) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/wallet-consolidation/month-data',
      queryString: httpParseParams({
        consolidation_id: consolidationId,
        wallet_id: walletId,
        data: 'origin_credit'
      })
    })

    const { status, data } = await http.get<IOriginCreditResponse[]>(url)

    const dataParsed = monthOriginCreditParseResponse(status === 200 ? data : [])

    return {
      status,
      data: dataParsed
    }
  },
  // year
  yearBalance: async ({ period, walletId, consolidationId }: IYearBalance) => {
    const url = httpPrepareUrl({
      url: '/v1/finance/wallet-consolidation/year-data',
      queryString: httpParseParams({
        consolidation_id: consolidationId,
        wallet_id: walletId,
        period: period,
        data: 'balance'
      })
    })

    const { status, data } = await http.get<IYearBalanceResponse[]>(url)

    const dataParsed = data.map(yearBalanceParseResponse)

    return {
      status,
      data: dataParsed
    }
  }
})

interface IProcessMonthProps {
  period: string
  walletId: number
}
interface ICreateMonthComposition {
  consolidationId: number
  composition: { tagId: number | string; percentageLimit: number | string }[]
}
interface IUpdateMonthComposition {
  consolidationId: number
  composition: { id: number; tagId?: number | string; percentageLimit?: number | string }[]
}
interface IDeleteMonthComposition {
  consolidationId: number
  compositionId: number
}
interface IConsolidationProps {
  period: string
  walletId: number
}
interface IDataProps {
  consolidationId: number
  walletId: number
}
interface IConsolidationResponse {
  consolidation_id: number
}
interface IBalanceResponse {
  revenue: number
  expense: number
  available: number
  estimate: number
}
interface ICompositionResponse {
  id: number
  value_current: number
  value_limit: number
  percentage_limit: number
  percentage_current: number
  tag: {
    id: number
    description: string
  }
  consolidation_id: number
}
interface IOriginTransactionalResponse {
  id: number
  revenue: number
  expense: number
  average: number
  origin: {
    id: number
    description: string
  }
  consolidation_id: number
}
interface IOriginCreditResponse {
  id: number
  sum: number
  origin: {
    id: number
    description: string
  }
  consolidation_id: number
}
interface IYearBalance {
  walletId: number
  consolidationId: number
  period: string
}
interface IYearBalanceResponse {
  label: string
  month: number
  balance: {
    revenue: number
    expense: number
  }
}

const createMonthCompositionParseRequest = (data: ICreateMonthComposition) => {
  return {
    consolidation_id: data.consolidationId,
    composition: data.composition.map((el) => ({
      tag_id: Number(el.tagId),
      percentage_limit: Number(el.percentageLimit)
    }))
  }
}
const updateMonthCompositionParseRequest = (data: IUpdateMonthComposition) => {
  return {
    consolidation_id: data.consolidationId,
    composition: data.composition.map((el) => {
      const data: {
        id: number
        tag_id?: number
        percentage_limit?: number
      } = {
        id: el.id
      }

      if (!!el?.tagId) {
        data.tag_id = Number(el.tagId)
      }
      if (!!el?.percentageLimit) {
        data.percentage_limit = Number(el.percentageLimit)
      }
      return data
    })
  }
}
const consolidationParseResponse = (data: IConsolidationResponse) => ({
  consolidationId: data.consolidation_id
})
const monthBalanceParseResponse = (data: IBalanceResponse): IFinanceConsolidationMonthBalance => ({
  revenue: data?.revenue ?? 0,
  expense: data?.expense ?? 0,
  available: data?.available ?? 0,
  estimate: data?.estimate ?? 0
})
const monthCompositionParseResponse = (data: ICompositionResponse[]): IFinanceConsolidationMonthComposition[] => {
  return data.map((el) => ({
    id: el.id,
    valueCurrent: el.value_current,
    valueLimit: el.value_limit,
    percentageLimit: el.percentage_limit,
    percentageCurrent: el.percentage_current,
    tagId: el.tag.id,
    tagDescription: el.tag.description,
    consolidationId: el.consolidation_id
  }))
}
const monthOriginTransactionalParseResponse = (
  data: IOriginTransactionalResponse[]
): IFinanceConsolidationMonthOriginTransactional[] => {
  return data.map((el) => ({
    id: el.id,
    revenue: el.revenue,
    expense: el.expense,
    average: el.average,
    originId: el.origin.id,
    originDescription: el.origin.description,
    consolidationId: el.consolidation_id
  }))
}
const monthOriginCreditParseResponse = (data: IOriginCreditResponse[]): IFinanceConsolidationMonthOriginCredit[] => {
  return data.map((el) => ({
    id: el.id,
    sum: el.sum,
    originId: el.origin.id,
    originDescription: el.origin.description,
    consolidationId: el.consolidation_id
  }))
}
const yearBalanceParseResponse = (data: IYearBalanceResponse) => data
