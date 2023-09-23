import CookieAbstract from './CookieAbstract'
import { _SortApi, _limitApi } from '@/types/enum'

interface CookieData {
  query: string
  sort: _SortApi
  order: 'id' | 'description'
  page: number
  limit: _limitApi
  panel?: number
  deleted?: 1
}
/** NonNullable remove null of all keys Data */
type RequiredData = { [K in keyof CookieData]: NonNullable<CookieData[K]> }

export class FinanceWalletCookie extends CookieAbstract {
  constructor(readonly cookieName: string, readonly cookieInitialData: CookieData) {
    super()

    this.key = cookieName
  }

  up() {
    this.setCookieObject(this.cookieInitialData)
  }
  down() {
    this.destroyCookie()
  }
  reset(value: Partial<CookieData> = {}) {
    return this.setCookieObject({ ...this.cookieInitialData, ...value })
  }

  get() {
    return this.getCookie<RequiredData>()
  }
  set(value: Partial<CookieData>) {
    return this.mergeWithOldValueBeforeUpdating(value)
  }
  getByKey(key: keyof CookieData) {
    return this.getCookie<CookieData>()?.[key]
  }
}

export const financeWalletCookie = new FinanceWalletCookie('financeWallet', {
  query: '',
  limit: 15,
  page: 1,
  sort: 'asc',
  order: 'description'
  // panel: null,
  // deleted: null
})
