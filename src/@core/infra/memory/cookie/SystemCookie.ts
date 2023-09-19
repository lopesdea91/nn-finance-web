import CookieAbstract from './CookieAbstract'

interface SystemCookieData {
  period: string
  financeConsolidationId: number | null
  financeWalletId: number | null
}
/** NonNullable remove null of all keys Data */
type RequiredData = { [K in keyof SystemCookieData]: NonNullable<SystemCookieData[K]> }

export class SystemCookie extends CookieAbstract {
  static key: string = 'system'

  static default: SystemCookieData = {
    period: '',
    financeConsolidationId: null,
    financeWalletId: null
  }

  constructor() {
    super('system')
  }

  get() {
    return this.getCookie<RequiredData>({ jsonParse: true })
  }
  set(value: Partial<SystemCookieData>) {
    return this.mergeWithOldValueBeforeUpdating(value)
  }
  getByKey(key: keyof SystemCookieData) {
    return this.getCookie<SystemCookieData>({ jsonParse: true })?.[key]
  }
}

export const systemCookie = new SystemCookie()
