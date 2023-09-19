import { ContextSSR } from '@/types/system'
import { CookieSerializeOptions } from 'cookie'
import { destroyCookie, parseCookies, setCookie } from 'nookies'

export default class CookieAbstract {
  private context: ContextSSR | undefined
  protected key: string

  constructor(key: string) {
    this.key = key
  }

  public setContext(ctx: ContextSSR | undefined) {
    this.context = ctx
    return this
  }

  protected setCookie(value: string) {
    setCookie(this.context || null, this.key, value, {
      path: '/',
      maxAge: 60 * 10 // (seconds * min),
    })
  }

  protected getCookie<T>({ jsonParse }: { jsonParse: boolean }) {
    let value = ''

    const cookie = parseCookies(this.context)

    if (!cookie[this.key]) {
      return null as T
    }

    value = cookie[this.key]

    if (jsonParse) {
      // try {
      value = JSON.parse(value)
      // } catch (error) {
      //   console.log(error)
      // }
    }

    return value as T
  }

  protected removeCookie(key: string) {
    destroyCookie(this.context, key)
  }

  protected updatingValuesEmpty<T>(data: T) {
    const oldData: Record<string, string> = this.getCookie({ jsonParse: true }) || {}
    const newData: Record<string, string> = Object.assign({}, data)

    Object.entries(newData).forEach(([key, val]) => {
      // caso a chave não exista, criar a chave
      if (!(key in oldData)) {
        oldData[key] = val
      }

      // caso a chave exista, validar seu valor caso vazio adicionar o valor corrente
      if (!oldData[key]) {
        oldData[key] = val
        // } else {
        // console.log('com valor', key, val)
      }
    })

    const dataString = JSON.stringify(oldData) // convert string
    this.setCookie(dataString)
  }

  protected mergeWithOldValueBeforeUpdating<T>(data: T) {
    const oldData: Record<string, string> = this.getCookie({ jsonParse: true }) || {} // get old data
    const newData: Record<string, string> = Object.assign({}, oldData, data) // merge with new data
    const dataString = JSON.stringify(newData) // convert string
    this.setCookie(dataString)
  }

  protected setCookieObject(data: Object) {
    this.setCookie(JSON.stringify(data))

    return data
  }

  hasCookie() {
    const cookie = parseCookies(this.context)

    if (!cookie[this.key]) {
      throw Error(`Cookie (${this.key}) not found`)
    }

    return this
  }
}
