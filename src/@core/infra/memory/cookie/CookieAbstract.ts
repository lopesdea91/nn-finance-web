import { ContextSSR } from '@/types/system'
import { destroyCookie, parseCookies, setCookie } from 'nookies'

export default class CookieAbstract {
  private context: ContextSSR | undefined
  protected key: string = ''

  public hasCookie() {
    const cookie = parseCookies(this.context)

    if (!cookie[this.key]) {
      throw Error(`Cookie (${this.key}) not found`)
    }

    return this
  }
  public createCookie(data: Object) {
    const dataString = JSON.stringify(data)

    const options = {
      path: '/',
      maxAge: 60 * 5 /** (seconds * min * hora) */
    }

    setCookie(this.context || null, this.key, dataString, options)
  }
  protected destroyCookie() {
    destroyCookie(this.context, this.key)
  }

  public setContext(ctx: ContextSSR | undefined) {
    this.context = ctx
    return this
  }

  protected setCookieObject(data: Object) {
    setCookie(this.context || null, this.key, JSON.stringify(data))
    return data
  }
  protected setCookie(value: string) {
    setCookie(this.context || null, this.key, value)
  }
  protected getCookie<T>() {
    const cookie = parseCookies(this.context)

    if (!cookie?.[this.key]) {
      return null as T
    }

    return JSON.parse(cookie[this.key]) as T
  }
  protected mergeWithOldValueBeforeUpdating<T>(data: T) {
    const oldData: Record<string, string> = this.getCookie() // get old data
    const newData: Record<string, string> = Object.assign({}, oldData, data) // merge with new data
    const dataString = JSON.stringify(newData) // convert string
    this.setCookie(dataString)
  }
}
