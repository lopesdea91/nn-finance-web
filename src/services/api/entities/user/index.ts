import { UserDataResponse } from "@/types/entities/user"
import { requestConfig } from "../../config"

const requests = {
  data: async () => {
    const request = requestConfig()

    const url = 'v1/user/data'

    return await request.get<UserDataResponse>(url)
  }
}

export default requests