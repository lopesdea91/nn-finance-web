import { _limitApi } from '@/types/enum'

export type ApiPageResponse<D> = {
  items: D[]
  limit: _limitApi
  total: number
  lastPage: number
  page: number
}

export const api = {}