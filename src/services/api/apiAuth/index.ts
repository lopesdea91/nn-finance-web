import { axiosConfig, AxiosConfigProps } from "@/services/api/config/index"
import { SignInPayload, SignInResponse } from "@/types/entities/auth"

export const apiAuth = (props: AxiosConfigProps = {}) => {
  const axios = axiosConfig(props)
  const url = '/v1/auth'

  return {
    signIn: async (form: SignInPayload) => {
      return await axios.post<SignInResponse>(`${url}/sign-in`, form)
    },
    // signUp: async ({ form }: {form: SignUpPayload}) => {
    //     const url = '/v1/auth/sign-up'
    //     const { post } = common({ url })

    //     return await post<SignUpResponse, SignUpPayload>({
    //         form
    //     })
    // },
    // signOut: () => { },
    // forgotPassword: () => { },
  }
}