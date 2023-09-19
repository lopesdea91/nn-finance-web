import { httpPrepareUrl } from '@/@core/utils/httpPrepareUrl'
import IHttpClient from '../../http/httpClient'

export const authGatewayV1 = (http: IHttpClient) => ({
  signIn: async (props: ISignInProps) => {
    const url = httpPrepareUrl({
      url: '/v1/auth/sign-in'
    })

    const { status, data } = await http.post<ISignInResponse>(url, {
      email: props.email,
      password: props.password
    })

    const dataParsed = signInParse(data)

    return {
      status,
      data: dataParsed
    }
  },
  signOut: async () => {
    const url = httpPrepareUrl({
      url: '/v1/auth/sign-out'
    })

    const { status } = await http.post(url, {})

    return {
      status
    }
  }
})

interface ISignInProps {
  email: string
  password: string
}
interface ISignInResponse {
  token: string
}
const signInParse = (data: ISignInResponse) => ({
  token: data.token
})
