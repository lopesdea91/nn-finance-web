import { IFinanceItemTypePreview, IFinanceStatusId, IFinanceTypeId, _SortApi, _limitApi } from '@/types/enum'
import CookieAbstract from './CookieAbstract'

interface CookieData {
  query: string
  limit: _limitApi
  page: number
  sort: _SortApi
  order?: 'id' | 'value' | 'date' | 'created' | 'updated'
  statusId?: IFinanceStatusId | null
  typeId?: IFinanceTypeId | null
  originId?: number[] | null
  tagIds?: { id: number; label: string }[]
  walletId?: number
  typePreview?: IFinanceItemTypePreview
  minDate?: string
  maxDate?: string
  deleted?: 1 | 0
}
/** NonNullable remove null of all keys Data */
type RequiredData = { [K in keyof CookieData]: NonNullable<CookieData[K]> }

export class FinanceItemCookie extends CookieAbstract {
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

export const financeItemCookie = new FinanceItemCookie('financeItem', {
  query: '',
  limit: 15,
  page: 1,
  sort: 'desc',
  order: 'date',
  statusId: null,
  typeId: null,
  originId: null,
  tagIds: [],
  // walletId: null,
  // typePreview?: IFinanceItemTypePreview
  minDate: '',
  maxDate: ''
})
