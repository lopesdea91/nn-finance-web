import axios from 'axios'
import { FinanceTagGeteway } from "@/@core/infra/geteway/FinanceTagGeteway"
import { FinanceTag } from '@/types/entities/finance-tag'

const itemResponse = {
  "id": 1,
  "description": "Mercado",
  "enable": 1,
  "type": {
    "id": 2,
    "description": "Despesa"
  },
  "wallet": {
    "id": 1,
    "description": "CARTEIRA 1"
  },
  "createdAt": "2023-01-01",
  "updatedAt": "2023-01-01"
}
const itemParsed: FinanceTag = {
  id: 1,
  description: 'Mercado',
  enable: 1,
  type: {
    "id": 2,
    "description": "Despesa"
  },
  typeId: 2,
  wallet: {
    "id": 1,
    "description": "CARTEIRA 1"
  },
  walletId: 1,
  createdAt: '2023-01-01',
  updatedAt: '2023-01-01',
}

describe('src/@core/infra/geteway/FinanceTagGeteway', () => {
  const financeTagGeteway = new FinanceTagGeteway(axios)
  let resultMock: unknown

  test('page', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        items: [itemResponse],
        page: 1,
        total: 9,
        limit: 15,
        lastPage: 1
      }
    })

    const result = await financeTagGeteway.page()

    expect(result.data).toEqual({
      items: [itemParsed],
      page: 1,
      total: 9,
      limit: 15,
      lastPage: 1
    })
  })
  test('get', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: [itemResponse]
    })

    const result = await financeTagGeteway.get()

    expect(result.data).toEqual([itemParsed])
  })
  test('id', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: itemResponse
    })

    const result = await financeTagGeteway.id(1)

    expect(result.data).toEqual(itemParsed)
  })
  test('post', async () => {
    resultMock = {
      message: 'Item criado'
    }

    jest.spyOn(axios, 'post').mockResolvedValueOnce({
      status: 201,
      data: resultMock
    })

    const result = await financeTagGeteway.post({
      description: 'Mercado',
      enable: 1,
      typeId: 1,
      walletId: 1
    })

    expect(result.status).toBe(201)
    expect(result.data).toEqual(resultMock)
  })
  test('put', async () => {
    resultMock = {
      message: 'Item atualizado'
    }

    jest.spyOn(axios, 'put').mockResolvedValueOnce({
      status: 201,
      data: resultMock
    })

    const result = await financeTagGeteway.put(1, {
      description: 'Mercado',
      enable: 1,
      typeId: 1,
      walletId: 1
    })

    expect(result.status).toEqual(201)
    expect(result.data).toEqual(resultMock)
  })
  test('remove', async () => {
    jest.spyOn(axios, 'delete').mockResolvedValueOnce({
      status: 204,
      data: null
    })

    const result = await financeTagGeteway.remove(1)

    expect(result.status).toBe(204)
    expect(result.data).toBeNull()
  })
  test('enable', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      status: 204,
      data: null
    })

    const result = await financeTagGeteway.enabled(1)

    expect(result.status).toBe(204)
    expect(result.data).toBeNull()
  })
  test('disabled', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      status: 204,
      data: null
    })

    const result = await financeTagGeteway.disabled(1)

    expect(result.status).toBe(204)
    expect(result.data).toBeNull()
  })
})
