import { SignInPayload, SignInResponse } from "@/types/entities/auth"
import { requestConfig } from "../../config"

const request = {
    signIn: async ({ form }: { form: SignInPayload }) => {
        const request = requestConfig()

        const url = '/v1/auth/sign-in'

        return await request.post<SignInResponse>(url, form)
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
export default request