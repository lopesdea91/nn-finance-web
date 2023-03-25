import { axiosConfig, AxiosConfigProps } from "@/services/api/config/index"
import { FinanceDataResponse } from "@/types/entities/finance"

export const apiFinance = (props: AxiosConfigProps = {}) => {
  const axios = axiosConfig(props)
  let url = '/v1/finance'

  return {
    data: async () => {
      url += '/data'

      return await axios.get<FinanceDataResponse>(url)
    }
  }
}