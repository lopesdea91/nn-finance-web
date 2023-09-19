import { _SortApi, _limitApi } from '@/types/enum'
import CookieAbstract from './CookieAbstract'

interface FinanceOriginCookieData {
  query: string
  sort: _SortApi
  order: 'id' | 'description'
  page: number
  limit: _limitApi
  typeId?: number[]
  parentId?: number
  walletId?: number
  deleted?: 1
}
/** NonNullable remove null of all keys Data */
type RequiredData = { [K in keyof FinanceOriginCookieData]: NonNullable<FinanceOriginCookieData[K]> }

export class FinanceOriginCookie extends CookieAbstract {
  static key: string = 'financeOrigin'

  static default: FinanceOriginCookieData = {
    query: '',
    limit: 15,
    page: 1,
    sort: 'asc',
    order: 'description',
    typeId: []
    // parentId?: null
    // walletId?: null
    // deleted?: null
  }

  constructor() {
    super('financeOrigin')
  }

  get() {
    return this.getCookie<RequiredData>({ jsonParse: true })
  }
  set(value: Partial<FinanceOriginCookieData>) {
    return this.mergeWithOldValueBeforeUpdating(value)
  }
  getByKey(key: keyof FinanceOriginCookieData) {
    return this.getCookie<FinanceOriginCookieData>({ jsonParse: true })?.[key]
  }
  reset(value: Partial<FinanceOriginCookieData> = {}) {
    return this.setCookieObject({
      query: '',
      limit: 15,
      page: 1,
      sort: 'asc',
      order: 'description',
      typeId: [],
      parentId: null,
      walletId: null,
      deleted: null,
      ...value
    })
  }
}

export const financeOriginCookie = new FinanceOriginCookie()
