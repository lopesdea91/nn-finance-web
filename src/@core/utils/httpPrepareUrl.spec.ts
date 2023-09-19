import { httpParseParams, httpPrepareUrl } from '.'

describe('src/@core/utils/httpPrepareUrl', () => {
  it('execute with param url', () => {
    const url = httpPrepareUrl({
      url: 'localhost:3000'
    })

    expect(url).toBe('localhost:3000')
  })

  it('execute with params url and id', () => {
    const url = httpPrepareUrl({
      url: 'localhost:3000',
      id: 123
    })

    expect(url).toBe('localhost:3000/123')
  })

  it('execute with params url and queryString', () => {
    const url = httpPrepareUrl({
      url: 'localhost:3000',
      queryString: httpParseParams({ type_id: 1, status: 3 })
    })

    expect(url).toBe('localhost:3000?type_id=1&status=3')
  })
})
