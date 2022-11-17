import common from '@/config/services/api/common'
import { UserDataResponseData, UserDataResponse } from '@/types/user';

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
    get: () => { },
    put: () => { },
}