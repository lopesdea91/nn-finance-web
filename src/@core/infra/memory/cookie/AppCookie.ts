import CookieAbstract from './CookieAbstract'
import CookieKeyBase from './CookieKeyBase'
import { AuthCookie } from './AuthCookie'
import { SystemCookie } from './SystemCookie'
import { FinanceWalletCookie } from './FinanceWalletCookie'
import { FinanceOriginCookie } from './FinanceOriginCookie'
import { FinanceTagCookie } from './FinanceTagCookie'
import { FinanceItemCookie } from './FinanceItemCookie'

class AppCookie extends CookieAbstract {
  constructor() {
    super('')
  }

  private initKeys: CookieKeyBase[] = [SystemCookie, FinanceWalletCookie, FinanceOriginCookie, FinanceTagCookie, FinanceItemCookie]

  // private resetKeys: CookieKeyBase[] = [SystemCookie]

  init() {
    this.initKeys.forEach((item) => {
      const currentKey = item.key
      const currentValue = item.default

      this.key = currentKey /** update key CookieAbstract */

      // const value: string = JSON.stringify(currentValue)

      this.updatingValuesEmpty(currentValue) /** set cookie in CookieAbstract */
    })
  }

  reset() {
    this.removeCookie(SystemCookie.key)
    this.removeCookie(AuthCookie.key)
    this.removeCookie(FinanceWalletCookie.key)
    this.removeCookie(FinanceOriginCookie.key)

    // this.resetKeys.forEach((currentClass) => {
    //   this.removeCookie(currentClass.key)
    // })
  }
}

export const appCookie = new AppCookie()
