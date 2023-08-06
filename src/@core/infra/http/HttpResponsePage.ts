import { _limitApi } from '@/types/enum'

export default interface IHttpResponsePage<T> {
  items: T[]
  page: number
  total: number
  limit: _limitApi
  lastPage: number
}
