import { IFinanceTypeId, _OrderApi, _SortApi, _limitApi } from '@/types/enum'
import CookieAbstract from './CookieAbstract'

interface FinanceTagCookieData {
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
type RequiredData = { [K in keyof FinanceTagCookieData]: NonNullable<FinanceTagCookieData[K]> }

export class FinanceTagCookie extends CookieAbstract {
  static key: string = 'financeTag'

  static default: FinanceTagCookieData = {
    query: '',
    limit: 15,
    page: 1,
    sort: 'asc',
    order: 'description',
    typeId: []
  }

  constructor() {
    super('financeTag')
  }

  get() {
    return this.hasCookie().getCookie<RequiredData>({ jsonParse: true })
  }
  set(value: Partial<FinanceTagCookieData>) {
    return this.mergeWithOldValueBeforeUpdating(value)
  }
  getByKey(key: keyof FinanceTagCookieData) {
    return this.getCookie<FinanceTagCookieData>({ jsonParse: true })?.[key]
  }
  reset(value: Partial<FinanceTagCookieData> = {}) {
    return this.setCookieObject({
      query: '',
      limit: 15,
      page: 1,
      sort: 'asc',
      order: 'description',
      typeId: [],
      ...value
    })
  }
}

export const financeTagCookie = new FinanceTagCookie()
