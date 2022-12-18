import axios from 'axios'
import { PageProps, GetProps, GetResult, PostProps, PostResult, PutProps, PutResult, DelProps, DelResult } from '@/types/request';
import useApiCommon, { NameApi } from '@/hooks/useApiCommon';
// import layoutStore from '@/store/layoutStore';

// const renderAlerts = (message: string | string[]) => {
//     const content = Array.isArray(message) ? message : [message]

//     const check = (msg: string) => {
//         if (msg.includes('SQLSTATE'))
//             return 'Erro interno'
//         return msg
//     }

//     content.forEach((msg) => {
//         layoutStore.actions.addAlert({
//             label: check(msg),
//             type: 'danger'
//         })
//     })
// }

const common = (nameApi: NameApi = 'finance') => {
    const { token } = useApiCommon(nameApi)

    const options = {
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token ? `Bearer ${token}` : '',
        },
    }

    const qs = <T>(search: T): string => {
        var str = ''

        const obj = {
            _paginate: true,
            ...search
        }

        Object.keys(obj || {}).forEach((key, i) => {

            const alias = i === 0 ? '?' : '&'
            const value = (obj as any)[key]

            const check = [
                value,
            ].filter(Boolean).length

            if (check) {
                str += `${alias}${key}=${value}`
            }

        })

        return str
    }
    const page = async<Data, T>({ url, search }: PageProps<T>) => {

        url += qs<T>(search)

        return await axios.get<Data>(url, options)
        // .catch((res) => {
        //     renderAlerts(res.response?.data?.message || res.message)
        //     return res
        // });
    }
    const get = async<Data>({ url }: GetProps): Promise<GetResult<Data>> => {
        return await axios.get<Data>(url, options)
        // .catch((res) => {
        //     renderAlerts(res.response?.data?.message || res.message)
        //     return res
        // });
    }
    const post = async<Data>({ url, form }: PostProps): Promise<PostResult<Data>> => {//Promise<PostResult<Data>> => {
        const body = form

        return await axios.post<Data>(url, body, options)
        // .catch((res) => {
        //     renderAlerts(res.response?.data?.message || res.message)
        //     return res
        // })
    }
    const put = async<Data>({ url, id, form }: PutProps): Promise<PutResult<Data>> => {
        const body = form

        return await axios.put<Data>(`${url}/${id}`, body, options)
        // .catch((res) => {
        //     renderAlerts(res.response?.data?.message || res.message)
        //     return res
        // })
    }
    const del = async ({ url, id }: DelProps): Promise<DelResult> => {
        return await axios.delete(`${url}/${id}`, options)
        // .catch((res) => {
        //     renderAlerts(res.response?.data?.message || res.message)
        //     return res
        // })
    }


    return { get, post, put, del, page }
}

export default common