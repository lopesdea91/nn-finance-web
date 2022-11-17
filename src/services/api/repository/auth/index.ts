import common from '@/config/services/api/common'
import { SignInPayload, SignInResponse, SignInResponseData } from '@/types/auth'

export default {
    signIn: async (props: SignInPayload): Promise<SignInResponse> => {
        const { post } = common()

        const form = props

        const { status, data } = await post<SignInResponseData>({
            url: 'v1/auth/sign-in',
            form
        })

        return {
            status: status === 201,
            data
        }
    },
    signUp: () => { },
    signOut: () => { },
    forgotPassword: () => { },
}