import axios, { AxiosStatic } from 'axios'
import IHttpClient from './httpClient'

class Http implements IHttpClient {
  private request: AxiosStatic = axios

  constructor() {
    this.configHeaders()
    this.setBaseUrl()
  }
  private configHeaders() {
    this.request.defaults.headers['Content-Type'] = 'application/json'
    this.request.defaults.headers['Accept'] = 'application/json'
  }
  private setBaseUrl() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    this.request.defaults.baseURL = baseUrl
  }

  setToken(token: string) {
    this.request.defaults.headers['Authorization'] = token ? `Bearer ${token}` : ''
  }

  get<R>(url: string) {
    return this.request.get<R>(url)
  }
  post<T, R>(url: string, input: T) {
    return this.request.post<R>(url, input)
  }
  put<T>(url: string, input: T) {
    return this.request.put(url, input)
  }
  delete(url: string) {
    return this.request.delete(url)
  }
}

export const http = new Http()
