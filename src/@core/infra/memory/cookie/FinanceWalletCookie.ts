import { _SortApi, _limitApi } from '@/types/enum'
import CookieAbstract from './CookieAbstract'

interface FinanceWalletCookieData {
  query: string
  sort: _SortApi
  order: 'id' | 'description'
  page: number
  limit: _limitApi
  panel?: number
  deleted?: 1
}
/** NonNullable remove null of all keys Data */
type RequiredData = { [K in keyof FinanceWalletCookieData]: NonNullable<FinanceWalletCookieData[K]> }

export class FinanceWalletCookie extends CookieAbstract {
  static key: string = 'financeWallet'

  static default: FinanceWalletCookieData = {
    query: '',
    limit: 15,
    page: 1,
    sort: 'asc',
    order: 'description'
    // panel: null,
    // deleted: null
  }

  constructor() {
    super('financeWallet')
  }

  get() {
    return this.getCookie<RequiredData>({ jsonParse: true })
  }
  set(value: Partial<FinanceWalletCookieData>) {
    return this.mergeWithOldValueBeforeUpdating(value)
  }
  getByKey(key: keyof FinanceWalletCookieData) {
    return this.getCookie<FinanceWalletCookieData>({ jsonParse: true })?.[key]
  }
  reset(value: Partial<FinanceWalletCookieData> = {}) {
    return this.setCookieObject({
      query: '',
      limit: 15,
      page: 1,
      sort: 'asc',
      order: 'description',
      // panel: null,
      // deleted: null
      ...value
    })
  }
}

export const financeWalletCookie = new FinanceWalletCookie()
