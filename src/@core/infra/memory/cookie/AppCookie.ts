import { systemCookie } from './SystemCookie'
import { financeWalletCookie } from './FinanceWalletCookie'
import { financeOriginCookie } from './FinanceOriginCookie'
import { financeTagCookie } from './FinanceTagCookie'
import { financeItemCookie } from './FinanceItemCookie'
import { authCookie } from './AuthCookie'

class AppCookie {
  private cookies = [authCookie, systemCookie, financeWalletCookie, financeOriginCookie, financeTagCookie, financeItemCookie]

  up() {
    this.cookies.forEach((cookie) => cookie.up())
  }
  down() {
    this.cookies.forEach((cookie) => cookie.down())
  }
  reset() {
    this.cookies.forEach((cookie) => cookie.reset())
  }
}

export const appCookie = new AppCookie()
