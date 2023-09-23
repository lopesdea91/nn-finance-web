import { appCookie } from './AppCookie'
import { FinanceWalletCookie } from './FinanceWalletCookie'

describe('src/@core/infra/memory/cookie/FinanceWalletCookie', () => {
  beforeEach(() => {
    appCookie.up()
  })
  afterEach(() => {
    appCookie.down()
  })

  test('check values', () => {
    const _financeWalletCookie = new FinanceWalletCookie('financeWallet', {
      query: '',
      limit: 15,
      page: 1,
      sort: 'asc',
      order: 'description'
    })

    expect(_financeWalletCookie.get().query).toBe('')

    _financeWalletCookie.set({ query: 'wallet test' })

    expect(_financeWalletCookie.get().query).toBe('wallet test')

    _financeWalletCookie.reset()

    expect(_financeWalletCookie.getByKey('query')).toBe('')

    _financeWalletCookie.down()

    try {
      _financeWalletCookie.hasCookie()
    } catch (error) {
      expect((error as Error).message).toBe('Cookie (financeWallet) not found')
    }
  })
})
