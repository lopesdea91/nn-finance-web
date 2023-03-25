import { $utils } from "@/utils"
import { AxiosStatic } from "axios"

type baseApiProps = {
  url: string,
  axios: AxiosStatic
}
export const baseApi = ({ url, axios }: baseApiProps) => {
  function page<Response, Search>(
    { search }:
      { search?: Partial<Search> } = {}
  ) {
    const q = $utils.queryString({ _paginate: true, ...search })

    return axios.get<Response>(url + q)
  }
  function get<R, Search>(
    { search, params }:
      { search?: Partial<Search>, params?: Record<string, string | number> } = {}
  ) {
    const q = $utils.queryString({ ...search, ...params })

    return axios.get<R>(url + q)
  }
  function id<R>({ id }: { id: number }) {
    return axios.get<R>(`${url}/${id}`)
  }
  function post<R, F>({ form }: { form: F }) {
    return axios.post<R>(url, form)
  }
  function put<R, F>({ id, form }: { id: number, form: F }) {
    url += `/${id}`

    return axios.put<R>(url, form)
  }
  function remove<R>({ id }: { id: number }) {
    url += `/${id}`

    return axios.delete<R>(url)
  }
  function enabled<R>({ id }: { id: number }) {
    url += `/${id}/enabled`

    return axios.get<R>(url)
  }
  function disabled<R>({ id }: { id: number }) {
    url += `/${id}/disabled`

    return axios.get<R>(url)
  }

  return { page, get, id, post, put, remove, enabled, disabled }
}