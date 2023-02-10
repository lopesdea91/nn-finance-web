import { FinanceDataResponse } from "@/types/entities/finance"
import { requestConfig } from "../../config"
import requestWallet from './requestWallet'

const requestFinance = {
  data: async () => {
    const request = requestConfig()

    const url = 'v1/finance/data'

    return await request.get<FinanceDataResponse>(url)
  }
}

const requests = {
  ...requestFinance,
  wallet: requestWallet
}

export default requests