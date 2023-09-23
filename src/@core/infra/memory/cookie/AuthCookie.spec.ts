import { AuthCookie } from './AuthCookie'

describe('src/@core/infra/memory/cookie/AuthCookie', () => {
  test('check values', () => {
    const _authCookie = new AuthCookie('auth', {
      token: ''
    })

    _authCookie.up()

    expect(_authCookie.get().token).toBe('')

    _authCookie.set({token: 'token-secret-123'})

    expect(_authCookie.getByKey('token')).toBe('token-secret-123')

    _authCookie.down()

    try {
      _authCookie.hasCookie()
    } catch (error) {
      expect((error as Error).message).toBe('Cookie (auth) not found')
    }
  })
})
