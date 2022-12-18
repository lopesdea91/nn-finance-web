import common from '@/config/services/api/common'
import {
    SignInPayload, SignInResponse, SignInResponseData,
    SignUpPayload, SignUpResponse, SignUpResponseData
} from '@/types/entities/auth'

const request = {
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
    signUp: async (props: SignUpPayload): Promise<SignUpResponse> => {
        const { post } = common()

        const form = props

        const { status, data } = await post<SignUpResponseData>({
            url: 'v1/auth/sign-up',
            form
        })

        return {
            status: status === 201,
            data
        }

    },
    signOut: () => { },
    forgotPassword: () => { },
}
export default request