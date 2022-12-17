import { responseBadBase, responseBase } from '../request'

// UserData
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
// UserPut
export interface UserPutPayload {
    id: number
    name: string
    email: string
    password: string
}
export interface UserPutResponseData extends responseBadBase {
    id: number
    name: string
    email: string
}
export interface UserPutResponse extends responseBadBase {
    status: boolean
    data: UserPutResponseData
}