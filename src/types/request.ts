import { _limitApi } from "./enum"

export type PageResponse<D> = {
    items: D[]
    limit: _limitApi
    total: number
    lastPage: number
    page: number
}

export interface PageProps<T> {
    search?: T
}
export interface GetProps<T> {
    search?: T
}
export interface GetIdProps {
    id: string | number;
}
export interface PostProps<F> {
    form: F;
}
export interface PutProps<F> {
    id: number;
    form: F;
}
export interface DelProps {
    id: number;
}