import { responseBadBase } from "../request"

export interface FinanceWallet {
    id: number | null
    description: string
    json: string
    enable: number
    panel: number
}
export interface FinanceWalletData extends responseBadBase {
    id: number
    description: string
    json: string
    enable: number
    panel: number
}
export interface FinanceWalletParams {
    page?: number
    limit?: number
    _q?: string
    enable?: number
    panel?: number
}
export interface FinanceWalletPaginatePayload { }

export interface FinanceWalletPaginate extends responseBadBase {
    items: FinanceWalletData[]
    page: number
    total: number
    limit: number
    lastPage: number
}
export interface FinanceWalletGetResponse extends responseBadBase {
    status: boolean
    data: FinanceWallet[]
}
export interface FinanceWalletGetId {
    id: number
}
export interface FinanceWalletGetIdResponse extends responseBadBase {
    status: boolean
    data: FinanceWallet
}
export interface FinanceWalletPostPayload {
    description: string
}
export interface FinanceWalletPostResponse extends responseBadBase {
    status: boolean
    data: FinanceWallet
}
export interface FinanceWalletPutPayload {
    id: number,
    description: string
    json: string
    enable: number
    panel: number
}
export interface FinanceWalletPutResponse extends responseBadBase {
    status: boolean
    data: FinanceWallet
}