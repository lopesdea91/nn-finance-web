import { appCookie } from './AppCookie'
import { SystemCookie } from './SystemCookie'

describe('src/@core/infra/memory/cookie/SystemCookie', () => {
  beforeEach(() => {
    appCookie.up()
  })
  afterEach(() => {
    appCookie.down()
  })

  test('check values', () => {
    const _systemCookie = new SystemCookie('system', {
      language: 'pt-br',
      period: '',
      financeConsolidationId: null,
      financeWalletId: null
    })

    expect(_systemCookie.get().language).toBe('pt-br')

    _systemCookie.set({ period: '2023-09' })
    _systemCookie.setLanguageMode('en')

    expect(_systemCookie.getByKey('language')).toBe('en')
    expect(_systemCookie.getByKey('period')).toBe('2023-09')

    _systemCookie.reset()

    expect(_systemCookie.getByKey('language')).toBe('pt-br')

    _systemCookie.down()

    try {
      _systemCookie.hasCookie()
    } catch (error) {
      expect((error as Error).message).toBe('Cookie (system) not found')
    }
  })
})
