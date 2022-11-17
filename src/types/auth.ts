import { responseBadBase, responseBase } from './request'

export interface SignInPayload {
    email: string,
    password: string
}
export interface SignInResponseData extends responseBadBase {
    token: string
}
export interface SignInResponse extends responseBase { data: SignInResponseData }