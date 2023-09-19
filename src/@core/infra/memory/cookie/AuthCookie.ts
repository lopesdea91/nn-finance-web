import CookieAbstract from './CookieAbstract'

interface AuthCookieData {
  token: string
}

export class AuthCookie extends CookieAbstract {
  static key: string = 'auth'

  static default: AuthCookieData = {
    token: ''
  }

  constructor() {
    super('auth')
  }

  getToken() {
    return this.getCookie<AuthCookieData>({ jsonParse: true })?.token
  }
  setToken(token: string) {
    return this.mergeWithOldValueBeforeUpdating({ token })
  }
}

export const authCookie = new AuthCookie()
