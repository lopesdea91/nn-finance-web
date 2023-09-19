import IHttpResponsePage from '../infra/http/HttpResponsePage'

export const httpParsePage = <T>(data: IHttpResponsePage<T>) => {
  return {
    items: data?.items || [],
    page: data?.page ?? 0,
    total: data?.total ?? 0,
    limit: data?.limit ?? 15,
    lastPage: data?.lastPage ?? 0
  }
}
