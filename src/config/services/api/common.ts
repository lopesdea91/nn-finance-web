import axios from '@/plugins/axios'
import { GetProps, GetResult, PostProps, PostResult, PutProps, PutResult, DelProps, DelResult } from '@/types/request';

export default () => {
    const token = window.localStorage.getItem(import.meta.env.VITE_KEY_TOKEN) || ''

    const options = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token ? `Bearer ${token}` : '',
        },
    }

    const get = async<Data>({ url }: GetProps): Promise<GetResult<Data>> => {
        console.log('token', token);

        return await axios.get<Data>(url, options)
            .catch((result) => {
                console.log('MESSAGE GET', result);
                return result
            });
    }
    const post = async<Data>({ url, form }: PostProps): Promise<PostResult<Data>> => {//Promise<PostResult<Data>> => {
        const body = form

        return await axios.post<Data>(url, body, options)
            .catch((result) => {
                console.log('MESSAGE POST', result);
                return result
            })
    }
    const put = async<Data>({ url, id, form }: PutProps): Promise<PutResult<Data>> => {
        const body = form

        return await axios.put<Data>(`${url}/${id}`, body, options)
            .catch((result) => {
                console.log('MESSAGE PUT', result);
                return result
            })
    }
    const del = async ({ url, id }: DelProps): Promise<DelResult> => {
        return await axios.delete(`${url}/${id}`, options)
            .catch((result) => {
                console.log('MESSAGE DELETE', result);
                return result
            })
    }

    return { get, post, put, del }
}