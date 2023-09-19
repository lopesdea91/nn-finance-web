import { _limitApi } from '@/types/enum'
import { httpPrepareUrl, httpParseParams } from '@/@core/utils'
import IHttpClient from '../../http/httpClient'

export const financeWalletCompositionGatewayV1 = (http: IHttpClient) => ({
  get: async ({ walletId }: IGetConsolidationProps) => {
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
  put: async (form: IUpdateConsolidationProps) => {
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
  remove: async ({ compositionId, walletId }: IRemoveConsolidationProps) => {
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
interface ICompositionDataResponse {
  id: number
  percentage_limit: number
  tag_id: number
  wallet_id: number
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
const compositionDataParse = (data: ICompositionDataResponse) => ({
  id: data.id,
  percentageLimit: data.percentage_limit,
  tagId: data.tag_id,
  walletId: data.wallet_id
})
