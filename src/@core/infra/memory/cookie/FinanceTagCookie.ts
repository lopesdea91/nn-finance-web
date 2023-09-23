import CookieAbstract from './CookieAbstract'
import { IFinanceTypeId, _OrderApi, _SortApi, _limitApi } from '@/types/enum'

interface CookieData {
  query: string
  limit: _limitApi
  page: number
  sort: _SortApi
  order: _OrderApi
  typeId?: IFinanceTypeId[]
  walletId?: number
  deleted?: 1
}
/** NonNullable remove null of all keys Data */
type RequiredData = { [K in keyof CookieData]: NonNullable<CookieData[K]> }

export class FinanceTagCookie extends CookieAbstract {
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
    return this.hasCookie().getCookie<RequiredData>()
  }
  set(value: Partial<CookieData>) {
    return this.mergeWithOldValueBeforeUpdating(value)
  }
  getByKey(key: keyof CookieData) {
    return this.getCookie<CookieData>()?.[key]
  }
}

export const financeTagCookie = new FinanceTagCookie('financeTag', {
  query: '',
  limit: 15,
  page: 1,
  sort: 'asc',
  order: 'description',
  typeId: []
})
