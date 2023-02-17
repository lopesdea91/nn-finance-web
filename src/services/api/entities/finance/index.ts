import { FinanceDataResponse } from "@/types/entities/finance"
import { requestConfig } from "../../config"
import requestWallet from './requestWallet'
import requestOrigin from './requestOrigin'
import requestTag from './requestTag'
import requestItem from './requestItem'

const requestFinance = {
  data: async () => {
    const request = requestConfig()

    const url = 'v1/finance/data'

    return await request.get<FinanceDataResponse>(url)
  }
}

const requests = {
  ...requestFinance,
  wallet: requestWallet,
  origin: requestOrigin,
  tag: requestTag,
  item: requestItem,
}

export default requests