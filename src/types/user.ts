import { responseBadBase, responseBase } from './request'

export interface UserDataResponseData extends responseBadBase {
    period: string
    user: {
        id: number
        name: string
        email: string
    }
}

export interface UserDataResponse extends responseBase {
    data: UserDataResponseData
}
