import axios, { AxiosStatic } from "axios"
import { AuthGeteway } from "@/@core/infra/geteway/AuthGeteway"
import { FinanceGeteway } from "@/@core/infra/geteway/FinanceGeteway"
import { FinanceItemGeteway } from "@/@core/infra/geteway/FinanceItemGeteway"
import { FinanceOriginGeteway } from "@/@core/infra/geteway/FinanceOriginGeteway"
import { FinanceTagGeteway } from "@/@core/infra/geteway/FinanceTagGeteway"
import { FinanceWalletGeteway } from "@/@core/infra/geteway/FinanceWalletGeteway"
import { UserGeteway } from "@/@core/infra/geteway/UserGeteway"

class Api {
  private request: AxiosStatic = axios

  constructor() {
    this.configHeaders()
    this.setBaseUrl()
  }

  setToken(token: string) {
    this.request.defaults.headers['Authorization'] = token ? `Bearer ${token}` : ''
  }

  private configHeaders() {
    this.request.defaults.headers['Content-Type'] = 'application/json'
    this.request.defaults.headers['Accept'] = 'application/json'
  }
  private setBaseUrl() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    this.request.defaults.baseURL = baseUrl
  }

  public auth = new AuthGeteway(this.request)
  public finance = new FinanceGeteway(this.request)
  public financeItem = new FinanceItemGeteway(this.request)
  public financeOrigin = new FinanceOriginGeteway(this.request)
  public financeTag = new FinanceTagGeteway(this.request)
  public financeWallet = new FinanceWalletGeteway(this.request)
  public user = new UserGeteway(this.request)
}

export const http = new Api()
