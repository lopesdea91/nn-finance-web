import { _limitApi } from '@/types/enum'
import { apiAuth } from './apiAuth'
import { apiFinance } from './apiFinance'
import { apiFinanceItem } from './apiFinanceItem'
import { apiFinanceOrigin } from './apiFinanceOrigin'
import { apiFinanceTag } from './apiFinanceTag'
import { apiFinanceWallet } from './apiFinanceWallet'
import { apiUser } from './apiUser'

export type ApiPageResponse<D> = {
  items: D[],
  limit: _limitApi
  total: number
  lastPage: number
  page: number
}

export const api = {
  auth: apiAuth,
  finance: apiFinance,
  financeItem: apiFinanceItem,
  financeOrigin: apiFinanceOrigin,
  financeTag: apiFinanceTag,
  financeWallet: apiFinanceWallet,
  user: apiUser,
}