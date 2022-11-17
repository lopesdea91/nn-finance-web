import { responseBadBase, responseBase } from './request'

export interface SignInPayload {
    email: string,
    password: string
}
export interface SignInResponseData extends responseBadBase {
    token: string
}
export interface SignInResponse extends responseBase { data: SignInResponseData }

export interface SignUpPayload {
    name: string
    email: string
    password: string
}

export interface SignUpResponseData extends responseBadBase {
    id: number
    email: string
    name: string
}

export interface SignUpResponse extends responseBase {
    data: SignUpResponseData
}