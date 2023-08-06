import HttpFake from './httpFake'

describe('src/@core/infra/http/HttpFake', () => {
  const httpFake = new HttpFake()

  it('get', async () => {
    const res = await httpFake.get('api.com/endpoint/id')

    expect(res.status).toBe(200)
    expect(res.data).toEqual({})
  })
  it('post', async () => {
    const body = {
      name: 'name',
      desc: 'text desc'
    }
    const res = await httpFake.post('api.com/endpoint', body)

    expect(res.status).toBe(201)
    expect(res.data).toEqual(body)
  })
  it('put', async () => {
    const body = {
      name: 'name',
      desc: 'text desc'
    }
    const res = await httpFake.put('api.com/endpoint/id', body)

    expect(res.status).toBe(201)
    expect(res.data).toEqual(body)
  })
  it('delete', async () => {
    const res = await httpFake.delete('api.com/endpoint/id')

    expect(res.status).toBe(204)
  })
})
