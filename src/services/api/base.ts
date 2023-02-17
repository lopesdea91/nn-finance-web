import { $ } from "@/utils"
import { requestConfig } from "./config"

type baseApiProps = {
  url: string
}
export const baseApi = (props: baseApiProps) => {
  const { url } = props

  const common = () => {
    return {
      request: requestConfig()
    }
  }

  function page<Response, Search>(
    { search }:
      { search?: Partial<Search> } = {}
  ) {
    const { request } = common()

    const q = $.queryString({ _paginate: true, ...search })

    return request.get<Response>(url + q)
  }
  function get<R, Search>(
    { search, params }:
      { search?: Partial<Search>, params?: Record<string, string | number> } = {}
  ) {
    const { request } = common()

    const q = $.queryString({ ...search, ...params })

    return request.get<R>(url + q)
  }
  function id<R>({ id }: { id: number }) {
    const { request } = common()

    return request.get<R>(`${url}/${id}`)
  }
  function post<R, F>({ form }: { form: F }) {
    const { request } = common()

    return request.post<R>(url, form)
  }
  function put<R, F>({ id, form }: { id: number, form: F }) {
    const { request } = common()

    return request.put<R>(`${url}/${id}`, form)
  }
  function remove<R>({ id }: { id: number }) {
    const { request } = common()

    return request.delete<R>(`${url}/${id}`)
  }

  return { page, get, id, post, put, remove }
}