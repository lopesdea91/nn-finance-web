import { AxiosStatic } from "axios";
import { } from "@/types/entities/finance-wallet";
import { $utils } from "@/utils";
import { _limitApi } from "@/types/enum";
import { FinanceWalletConsolidateMonth } from "@/types/entities/finance-wallet-composition";

let url = '/v1/finance/wallet-consolidation'

export class FinanceWalletConsolidationGeteway {
  constructor(private request: AxiosStatic) { }

  // POST
  async processMonth(form: IProcessMonthProps) {
    return await this.request.post<{ message: string }>(
      `${url}/month`, {
      ...form,
    })
  }
  // POST
  async createMonthComposition(form: ICreateMonthComposition) {
    return await this.request.post<{ message: string }>(
      `${url}//month-composition`,
      createMonthCompositionParseRequest(form)
    )
  }
  // PUT
  async updateMonthComposition(form: IUpdateMonthComposition) {
    return await this.request.put<{ message: string }>(
      `${url}//month-composition`,
      updateMonthCompositionParseRequest(form)
    )
  }
  // GET
  async balance({ period, walletId }: IFormProps) {
    const result = await this.request.get<IBalanceResponse>(
      `${url}/month?wallet_id=${walletId}&period=${period}-04&data=origin_credit`
    )

    return {
      ...result,
      data: balanceParseResponse(result.data)
    }
  }
  async composition({ period, walletId }: IFormProps) {
    const result = await this.request.get<ICompositionResponse[]>(
      `${url}/month?wallet_id=${walletId}&period=${period}-04&data=composition`
    )

    return {
      ...result,
      data: compositionParseResponse(result.data)
    }
  }
  async originTransactional({ period, walletId }: IFormProps) {
    const result = await this.request.get<IOriginTransactionalResponse[]>(
      `${url}/month?wallet_id=${walletId}&period=${period}-04&data=origin_transactional`
    )

    return {
      ...result,
      data: originTransactionalParseResponse(result.data)
    }
  }
  async originCredit({ period, walletId }: IFormProps) {
    const result = await this.request.get<IOriginCreditResponse[]>(
      `${url}/month?wallet_id=${walletId}&period=${period}-04&data=origin_credit`
    )

    return {
      ...result,
      data: originCreditParseResponse(result.data)
    }
  }
}

interface IProcessMonthProps {
  period: string,
  walletId: number
}
interface ICreateMonthComposition {
  consolidation_id: number
  composition: { tagId: number, percentageLimit: number }[]
}
interface IUpdateMonthComposition {
  consolidation_id: number
  composition: { id: number, tagId?: number, percentageLimit?: number }[]
}
interface IFormProps {
  period: string,
  walletId: number
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
    id: number,
    description: string
  }
  consolidation_id: number
}
interface IOriginTransactionalResponse {
  id: number
  sum: number
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
const createMonthCompositionParseRequest = (data: ICreateMonthComposition) => {
  return {
    composition_id: data.consolidation_id,
    composition: data.composition.map(el => ({
      tag_id: el.tagId,
      percentage_limit: el.percentageLimit
    }))
  }
}
const updateMonthCompositionParseRequest = (data: IUpdateMonthComposition) => {
  return {
    composition_id: data.consolidation_id,
    composition: data.composition.map(el => {

      const data: {
        tag_id?: number
        percentage_limit?: number
      } = {}

      if (!!el?.tagId) {
        data.tag_id = el.tagId
      }
      if (!!el?.percentageLimit) {
        data.percentage_limit = el.percentageLimit
      }

      return data
    })
  }
}
const balanceParseResponse = (data: IBalanceResponse) => {
  return {
    revenue: data.revenue,
    expense: data.expense,
    available: data.available,
    estimate: data.estimate,
  }
}
const compositionParseResponse = (data: ICompositionResponse[]) => {
  return data.map(el => ({
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
const originTransactionalParseResponse = (data: IOriginTransactionalResponse[]) => {
  return data.map(el => ({
    id: el.id,
    sum: el.sum,
    revenue: el.revenue,
    expense: el.expense,
    average: el.average,
    originId: el.origin.id,
    originDescription: el.origin.description,
    consolidationId: el.consolidation_id,
  }))
}
const originCreditParseResponse = (data: IOriginCreditResponse[]) => {
  return data.map(el => ({
    id: el.id,
    sum: el.sum,
    originId: el.origin.id,
    originDescription: el.origin.description,
    consolidationId: el.consolidation_id
  }))
}