import { FinanceConsolidateMonthResponse } from "@/types/entities/finance"
import { $ } from "@/utils"
import { baseApi } from "../../base"
import { requestConfig } from "../../config"

const requests = {
  ...baseApi({
    url: 'v1/finance/wallet'
  }),
  consolidateMonth: async ({ period, wallet_id }: { period: string, wallet_id: number }) => {
    const request = requestConfig()

    let url = 'v1/finance/wallet/consolidate-month'

    url += $.queryString({ period, wallet_id })

    return request.get<FinanceConsolidateMonthResponse>(url)
  }
}

export default requests