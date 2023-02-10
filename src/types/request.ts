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