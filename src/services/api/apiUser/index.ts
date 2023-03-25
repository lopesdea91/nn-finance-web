import { axiosConfig, AxiosConfigProps } from "@/services/api/config/index"
import { UserDataResponse } from "@/types/entities/user"

export const apiUser = (props: AxiosConfigProps = {}) => {
  const axios = axiosConfig(props)
  const url = '/v1/user'

  return {
    data: async () => {
      return await axios.get<UserDataResponse>(`${url}/data`)
    }
  }
}