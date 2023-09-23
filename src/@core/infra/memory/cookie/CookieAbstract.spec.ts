import { appCookie } from './AppCookie'
import CookieAbstract from './CookieAbstract'

interface CookieData {
  id: string
  name: string
}
class FooCookie extends CookieAbstract {
  constructor(readonly cookieName: string, readonly cookieInitialData: CookieData) {
    super()

    this.key = cookieName
  }

  up() {
    this.createCookie(this.cookieInitialData)
  }
  down() {
    this.destroyCookie()
  }

  getData() {
    return this.getCookie<CookieData>()
  }
  setDataFull(data: CookieData) {
    return this.setCookieObject(data)
  }
  setData(data: Partial<CookieData>) {
    return this.mergeWithOldValueBeforeUpdating(data)
  }
}

describe('src/@core/infra/memory/cookie/CookieAbstract', () => {
  test('check', () => {
    const _fooCookie = new FooCookie('foo', { id: '', name: '' })

    _fooCookie.up()

    _fooCookie.hasCookie().setContext(undefined)

    expect(_fooCookie.getData()).toEqual({ id: '', name: '' })

    _fooCookie.setData({ id: '1' })

    expect(_fooCookie.getData()).toEqual({ id: '1', name: '' })

    _fooCookie.setDataFull({ id: '2', name: 'Foo' })

    expect(_fooCookie.getData()).toEqual({ id: '2', name: 'Foo' })

    _fooCookie.down()

    try {
      _fooCookie.hasCookie()
    } catch (error) {
      expect((error as Error).message).toBe('Cookie (foo) not found')
    }
  })
})
