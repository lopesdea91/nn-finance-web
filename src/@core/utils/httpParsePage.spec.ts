import IHttpResponsePage from '../infra/http/HttpResponsePage'
import { httpParsePage } from './'

describe('src/@core/utils/httpParsePage', () => {
  it('execute parse with value empty', () => {
    const res = httpParsePage({
      items: [],
      lastPage: 0,
      limit: 15,
      page: 0,
      total: 0
    })

    expect(res).toEqual({
      items: [],
      lastPage: 0,
      limit: 15,
      page: 0,
      total: 0
    })
  })

  it('execute parse without value', () => {
    const res = httpParsePage({} as IHttpResponsePage<unknown>)

    expect(res).toEqual({
      items: [],
      lastPage: 0,
      limit: 15,
      page: 0,
      total: 0
    })
  })
})
