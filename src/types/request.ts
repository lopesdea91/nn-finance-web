import { AxiosResponse } from 'axios'

export interface GetProps {
    url: string;
}
export interface GetResult<Data> extends AxiosResponse<Data, any> { }

export interface PostProps {
    url: string;
    form: {};
}
export interface PostResult<Data> extends AxiosResponse<Data, any> { }

export interface PutProps {
    id: number;
    url: string;
    form: {};
}
export interface PutResult<Data> extends AxiosResponse<Data, any> { }

export interface DelProps {
    id: number;
    url: string;
}
export interface DelResult extends AxiosResponse<null, any> { }

export interface responseBase {
    status: boolean
}
export interface responseBadBase {
    message?: string
}