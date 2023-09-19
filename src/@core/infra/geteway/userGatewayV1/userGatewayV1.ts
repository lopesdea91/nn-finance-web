import { httpPrepareUrl } from '@/@core/utils/httpPrepareUrl'
import IHttpClient from '../../http/httpClient'

export const userGatewayV1 = (http: IHttpClient) => ({
  data: async () => {
    const url = httpPrepareUrl({
      url: '/v1/user/data'
    })

    const { status, data } = await http.get<IDataResponse>(url)

    return { status, data }
  },
  updateData: async (form: IUpdateData) => {
    const url = httpPrepareUrl({
      url: '/v1/user/data'
    })

    const { status, data } = await http.put<{ message: string }>(url, {
      name: form.name,
      email: form.email
    })

    return { status, data }
  },
  updateSecury: async (form: IUpdateSecury) => {
    const url = httpPrepareUrl({
      url: '/v1/user/secury'
    })

    const { status, data } = await http.put<{ message: string }>(url, {
      password: form.password
    })

    return { status, data }
  }
})

interface IDataResponse {
  period: string
  user: {
    id: number
    name: string
    email: string
  }
}
interface IUpdateData {
  name: string
  email: string
}
interface IUpdateSecury {
  password: string
}
