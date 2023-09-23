import CookieAbstract from './CookieAbstract'

interface CookieData {
  token: string
}
export class AuthCookie extends CookieAbstract {
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
    return this.getCookie<CookieData>()
  }
  set(value: Partial<CookieData>) {
    return this.mergeWithOldValueBeforeUpdating(value)
  }
  getByKey(key: keyof CookieData) {
    return this.getCookie<CookieData>()?.[key]
  }
}

export const authCookie = new AuthCookie('auth', {
  token: ''
})
