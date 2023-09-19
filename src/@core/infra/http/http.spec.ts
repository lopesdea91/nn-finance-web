import { http } from './http'
import axios from 'axios'

jest.mock('axios')

describe('src/@core/infra/http/http', () => {
  /** spy */
  const getAxios = jest.spyOn(axios, 'get')
  const postAxios = jest.spyOn(axios, 'post')
  const putAxios = jest.spyOn(axios, 'put')
  const deleteAxios = jest.spyOn(axios, 'delete')

  it('get', async () => {
    getAxios.mockResolvedValueOnce({
      status: 200,
      data: {}
    })

    const res = await http.get('api.com/endpoint/id')

    expect(res.status).toBe(200)
    expect(res.data).toEqual({})
  })
  it('post', async () => {
    postAxios.mockResolvedValueOnce({
      status: 201,
      data: {
        name: 'name',
        desc: 'text desc'
      }
    })

    const body = {
      name: 'name',
      desc: 'text desc'
    }
    const res = await http.post('api.com/endpoint', body)

    expect(res.status).toBe(201)
    expect(res.data).toEqual(body)
  })
  it('put', async () => {
    putAxios.mockResolvedValueOnce({
      status: 201,
      data: {
        name: 'name',
        desc: 'text desc'
      }
    })
    
    const body = {
      name: 'name',
      desc: 'text desc'
    }
    const res = await http.put('api.com/endpoint/id', body)

    expect(res.status).toBe(201)
    expect(res.data).toEqual(body)
  })
  it('delete', async () => {
    deleteAxios.mockResolvedValueOnce({
      status: 204,
      data: {
        name: 'name',
        desc: 'text desc'
      }
    })
    
    const res = await http.delete('api.com/endpoint/id')

    expect(res.status).toBe(204)
  })
  it('setToken', async () => {
    http.setToken('123456')
  })
})
