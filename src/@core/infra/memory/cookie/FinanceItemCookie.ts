import { IFinanceItemTypePreview, IFinanceStatusId, IFinanceTypeId, _SortApi, _limitApi } from '@/types/enum'
import CookieAbstract from './CookieAbstract'

interface FinanceItemCookieData {
  query: string
  limit: _limitApi
  page: number
  sort: _SortApi
  order?: 'id' | 'value' | 'date' | 'created' | 'updated'
  statusId?: IFinanceStatusId
  typeId?: IFinanceTypeId
  originId?: number[]
  tagIds?: { id: number; label: string }[]
  walletId?: number
  typePreview?: IFinanceItemTypePreview
  minDate?: string
  maxDate?: string
  deleted?: 1 | 0
}
/** NonNullable remove null of all keys Data */
type RequiredData = { [K in keyof FinanceItemCookieData]: NonNullable<FinanceItemCookieData[K]> }

export class FinanceItemCookie extends CookieAbstract {
  static key: string = 'financeItem'

  static default: FinanceItemCookieData = {
    query: '',
    limit: 15,
    page: 1,
    sort: 'desc',
    order: 'date'
  }

  constructor() {
    super('financeItem')
  }

  get() {
    return this.getCookie<RequiredData>({ jsonParse: true })
  }
  set(value: Partial<FinanceItemCookieData>) {
    return this.mergeWithOldValueBeforeUpdating(value)
  }
  getByKey(key: keyof FinanceItemCookieData) {
    return this.getCookie<FinanceItemCookieData>({ jsonParse: true })?.[key]
  }
  reset(value: Partial<FinanceItemCookieData> = {}) {
    return this.setCookieObject({
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
      maxDate: '',
      // deleted?: 1 | 0
      ...value
    })
  }
}

export const financeItemCookie = new FinanceItemCookie()
