import { appCookie } from './AppCookie'
import { FinanceTagCookie } from './FinanceTagCookie'

describe('src/@core/infra/memory/cookie/FinanceTagCookie', () => {
  beforeEach(() => {
    appCookie.up()
  })
  afterEach(() => {
    appCookie.down()
  })

  test('check values', () => {
    const _financeTagCookie = new FinanceTagCookie('financeTag', {
      query: '',
      limit: 15,
      page: 1,
      sort: 'asc',
      order: 'description'
    })

    expect(_financeTagCookie.get().query).toBe('')

    _financeTagCookie.set({ query: 'tag test' })

    expect(_financeTagCookie.get().query).toBe('tag test')

    _financeTagCookie.reset()

    expect(_financeTagCookie.getByKey('query')).toBe('')

    _financeTagCookie.down()

    try {
      _financeTagCookie.hasCookie()
    } catch (error) {
      expect((error as Error).message).toBe('Cookie (financeTag) not found')
    }
  })
})
