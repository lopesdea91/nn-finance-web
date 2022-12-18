import common from "@/config/services/api/common"
import {
    FinanceWallet,
    FinanceWalletData,
    FinanceWalletGetId,
    FinanceWalletGetIdResponse,
    FinanceWalletGetResponse,
    FinanceWalletPaginate,
    FinanceWalletParams,
    FinanceWalletPostPayload,
    FinanceWalletPostResponse,
    FinanceWalletPutPayload,
    FinanceWalletPutResponse,
} from '@/types/entities/FinanceWallet'

const parse = (item: FinanceWalletData): FinanceWallet => {
    return {
        id: item.id,
        description: item.description,
        enable: Number(item.enable),
        json: item.json,
        panel: Number(item.panel),
    }
}
const request = {
    page: async (props: FinanceWalletParams) => {
        const { page } = common()

        const { status, data } = await page<FinanceWalletPaginate, FinanceWalletParams>({
            url: `/v1/finance/wallet`,
            search: props
        })

        return {
            status: status === 200,
            data: data.items.map(parse),
            page: data.page,
            total: data.total,
            limit: data.limit,
            lastPage: data.lastPage
        }
    },
    get: async (): Promise<FinanceWalletGetResponse> => {
        const { get } = common()

        const { status, data } = await get<FinanceWalletData[]>({
            url: `/v1/finance/wallet`
        })

        return {
            status: status === 200,
            data: data.map(parse)
        }
    },
    id: async ({ id }: FinanceWalletGetId): Promise<FinanceWalletGetIdResponse> => {
        const { get } = common()

        const { status, data } = await get<FinanceWalletData>({
            url: `/v1/finance/wallet/${id}`
        })

        return {
            status: status === 200,
            data: parse(data)
        }
    },
    post: async (props: FinanceWalletPostPayload): Promise<FinanceWalletPostResponse> => {
        const { post } = common()

        const form = props

        const { status, data } = await post<FinanceWalletData>({
            url: `/v1/finance/wallet`,
            form,
        })

        return {
            status: status === 201,
            data: parse(data)
        }

    },
    put: async ({ id, ...props }: FinanceWalletPutPayload): Promise<FinanceWalletPutResponse> => {

        const { put } = common()

        const form = props

        const { status, data } = await put<FinanceWalletData>({
            url: `/v1/finance/wallet`,
            form,
            id
        })

        return {
            status: status === 201,
            data: parse(data)
        }
    },
    del: async (): Promise<void> => { },
}
export default request