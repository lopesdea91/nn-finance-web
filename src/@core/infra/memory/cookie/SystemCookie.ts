import CookieAbstract from './CookieAbstract'
import { ILanguageMode } from '@/types/system'

interface CookieData {
  language: ILanguageMode
  period: string
  financeConsolidationId: number | null
  financeWalletId: number | null
}
/** NonNullable remove null of all keys Data */
type RequiredData = { [K in keyof CookieData]: NonNullable<CookieData[K]> }

export class SystemCookie extends CookieAbstract {
  constructor(readonly cookieName: string, readonly cookieInitialData: CookieData) {
    super()

    this.key = cookieName
  }

   up() {
    if (!this.get()) {
      this.setCookieObject(this.cookieInitialData)
    }
  }
  down() {
    this.destroyCookie()
  }
  reset(value: Partial<CookieData> = {}) {
    return this.setCookieObject({ ...this.cookieInitialData, ...value })
  }

  get() {
    return this.getCookie<RequiredData>( )
  }
  set(value: Partial<CookieData>) {
    return this.mergeWithOldValueBeforeUpdating(value)
  }
  getByKey(key: keyof CookieData) {
    return this.getCookie<CookieData>( )?.[key]
  }
  setLanguageMode(value: ILanguageMode) {
    return this.mergeWithOldValueBeforeUpdating({ 
      language: value
    })
  }
}

export const systemCookie = new SystemCookie('system', {
  language: 'pt-br',
  period: '',
  financeConsolidationId: null,
  financeWalletId: null
})
