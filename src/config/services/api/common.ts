import { computed } from "vue";
import axios from '@/plugins/axios'
import AppStore from '@/store/AppStore'
import useStoreSystem from '@/hooks/useStoreSystem';
import { GetProps, GetResult, PostProps, PostResult, PutProps, PutResult, DelProps, DelResult } from '@/types/request';


export default () => {
    const { token } = useStoreSystem()

    const config = computed(() => {
        return {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: token ? `Bearer ${token}` : '',
            },
        }
    });

    const get = async<Data>({ url }: GetProps): Promise<GetResult<Data>> => {
        const options = config.value;

        console.log('token', token);

        return await axios.get<Data>(url, options)
            .catch((result) => {
                console.log('MESSAGE', result);
                return result
            });
    }
    const post = async<Data>({ url, form }: PostProps): Promise<PostResult<Data>> => {//Promise<PostResult<Data>> => {
        const body = form

        const options = config.value;

        return await axios.post<Data>(url, body, options)
            .catch((result) => {
                console.log('MESSAGE POST', result);
                return result
            })
    }
    const put = async<Data>({ url, id, form }: PutProps): Promise<PutResult<Data>> => {
        const body = form

        const options = config.value;

        return await axios.put<Data>(`${url}/${id}`, body, options)
            .catch((result) => {
                console.log('MESSAGE PUT', result);
                return result
            })
    }
    const del = async ({ url, id }: DelProps): Promise<DelResult> => {
        const options = config.value;

        return await axios.delete(`${url}/${id}`, options)
            .catch((result) => {
                console.log('MESSAGE DELETE', result);
                return result
            })
    }

    return { get, post, put, del }
}