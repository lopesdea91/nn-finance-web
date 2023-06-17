import axios from 'axios'
import { FinanceOriginGeteway } from "@/@core/infra/geteway/FinanceOriginGeteway"
import { FinanceOrigin } from '@/types/entities/finance-origin'

const itemResponse = {
  "id": 1,
  "description": "Inter Corrente",
  "enable": 1,
  "type": {
    "id": 1,
    "description": "Conta Corrente"
  },
  "parent": null,
  "wallet": {
    "id": 1,
    "description": "CARTEIRA 1"
  },
  "createdAt": "2023-01-01",
  "updatedAt": "2023-01-01"
}
const itemParsed: FinanceOrigin = {
  id: 1,
  description: 'Inter Corrente',
  enable: 1,
  type: {
    "id": 1,
    "description": "Conta Corrente"
  },
  typeId: 1,
  wallet: {
    "id": 1,
    "description": "CARTEIRA 1"
  },
  walletId: 1,
  parent: null,
  parentId: null,
  createdAt: '2023-01-01',
  updatedAt: '2023-01-01',
}

describe('src/@core/infra/geteway/FinanceOriginGeteway', () => {
  const financeOriginGeteway = new FinanceOriginGeteway(axios)
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

    const result = await financeOriginGeteway.page()

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

    const result = await financeOriginGeteway.get()

    expect(result.data).toEqual([itemParsed])
  })
  test('id', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: itemResponse
    })

    const result = await financeOriginGeteway.id(2)

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

    const result = await financeOriginGeteway.post({
      description: 'Text exanple',
      enable: 1,
      parentId: null,
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

    const result = await financeOriginGeteway.put(2, {
      description: 'text example',
      enable: 0,
      parentId: null,
      typeId: 1,
      walletId: 1
    })

    expect(result.status).toBe(201)
    expect(result.data).toEqual(resultMock)
  })
  test('remove', async () => {
    jest.spyOn(axios, 'delete').mockResolvedValueOnce({
      status: 204,
      data: null
    })

    const result = await financeOriginGeteway.remove(1)

    expect(result.status).toBe(204)
    expect(result.data).toBeNull()
  })
  test('enable', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      status: 204,
      data: null
    })

    const result = await financeOriginGeteway.enabled(1)

    expect(result.status).toBe(204)
    expect(result.data).toBeNull()
  })
  test('disabled', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      status: 204,
      data: null
    })

    const result = await financeOriginGeteway.disabled(1)

    expect(result.status).toBe(204)
    expect(result.data).toBeNull()
  })
})