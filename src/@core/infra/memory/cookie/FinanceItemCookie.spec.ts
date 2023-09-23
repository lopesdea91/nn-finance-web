import { appCookie } from './AppCookie'
import { FinanceItemCookie } from './FinanceItemCookie'

describe('src/@core/infra/memory/cookie/FinanceItemCookie', () => {
  beforeEach(() => {
    appCookie.up()
  })
  afterEach(() => {
    appCookie.down()
  })

  test('check values', () => {
    const _financeItemCookie = new FinanceItemCookie('financeItem', {
      query: '',
      limit: 15,
      page: 1,
      sort: 'desc',
      order: 'date',
      statusId: null,
      typeId: null,
      originId: null,
      tagIds: [],
      // walletId: null,
      // typePreview?: IFinanceItemTypePreview
      minDate: '',
      maxDate: ''
    })

    expect(_financeItemCookie.get().query).toBe('')

    _financeItemCookie.set({ query: 'description test' })

    expect(_financeItemCookie.get().query).toBe('description test')

    _financeItemCookie.reset()

    expect(_financeItemCookie.getByKey('query')).toBe('')

    _financeItemCookie.down()

    try {
      _financeItemCookie.hasCookie()
    } catch (error) {
      expect((error as Error).message).toBe('Cookie (financeItem) not found')
    }
  })
})
