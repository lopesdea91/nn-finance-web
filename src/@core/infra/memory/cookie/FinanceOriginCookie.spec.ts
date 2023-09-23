import { appCookie } from './AppCookie'
import { FinanceOriginCookie } from './FinanceOriginCookie'

describe('src/@core/infra/memory/cookie/FinanceOriginCookie', () => {
  beforeEach(() => {
    appCookie.up()
  })
  afterEach(() => {
    appCookie.down()
  })

  test('check values', () => {
    const _financeOriginCookie = new FinanceOriginCookie('financeOrigin', {
      query: '',
      limit: 15,
      page: 1,
      sort: 'asc',
      order: 'description',
      typeId: [],
      parentId: null,
      walletId: null,
      deleted: null
    })

    expect(_financeOriginCookie.get().query).toBe('')

    _financeOriginCookie.set({ query: 'description test' })

    expect(_financeOriginCookie.get().query).toBe('description test')

    _financeOriginCookie.reset()

    expect(_financeOriginCookie.getByKey('query')).toBe('')

    _financeOriginCookie.down()

    try {
      _financeOriginCookie.hasCookie()
    } catch (error) {
      expect((error as Error).message).toBe('Cookie (financeOrigin) not found')
    }
  })
})
