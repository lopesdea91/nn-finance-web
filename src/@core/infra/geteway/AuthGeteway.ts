import { AxiosStatic } from "axios";

const url = '/v1/auth'

export class AuthGeteway {
  constructor(private request: AxiosStatic) { }

  async signIn(props: ISignInProps) {
    const result = await this.request.post<ISignInResponse>(`${url}/sign-in`, {
      email: props.email,
      password: props.password
    })

    return {
      ...result,
      data: signInParse(result.data)
    }
  }

  async signOut() {
    const result = await this.request.post<ISignInResponse>(`${url}/sign-out`)

    return {
      ...result
    }
  }
}

interface ISignInProps {
  email: string,
  password: string
}
interface ISignInResponse {
  token: string
}
const signInParse = (data: ISignInResponse) => ({
  token: data.token
})