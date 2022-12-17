import common from '@/config/services/api/common'
import {
    UserDataResponseData, UserDataResponse,
    UserPutPayload, UserPutResponse, UserPutResponseData,
} from '@/types/entities/User';

export default {
    data: async (): Promise<UserDataResponse> => {
        const { get } = common()

        const { status, data } = await get<UserDataResponseData>({
            url: '/v1/user/data'
        })

        return {
            status: status === 200,
            data
        }
    },

    // get: () => { },

    put: async ({ id, ...props }: UserPutPayload): Promise<UserPutResponse> => {
        const { put } = common()

        const form = props

        const { status, data } = await put<UserPutResponseData>({
            id,
            form,
            url: '/v1/user'
        })

        return {
            status: status === 201,
            data
        }
    },
}