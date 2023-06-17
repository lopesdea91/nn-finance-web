import axios from 'axios'
import { FinanceItemGeteway } from "@/@core/infra/geteway/FinanceItemGeteway"
import { FinanceItem } from "@/types/entities/finance-item"

const itemResponse = {
  id: 1,
  value: 1,
  date: '2023-15-01',
  sort: 1,
  enable: 1,
  obs: '',
  origin: {
    id: 1,
    description: "CORRENTE INTER"
  },
  status: {
    id: 1,
    description: "Pago"
  },
  type: {
    id: 1,
    description: "Receita"
  },
  tag_ids: [],
  wallet: {
    id: 1,
    description: "CARTEIRA 1"
  },
  createdAt: '2023-01-01',
  updatedAt: '2023-01-01'
}
const itemParsed: FinanceItem = {
  id: 1,
  value: 1,
  date: '2023-15-01',
  sort: 1,
  enable: 1,
  obs: '',
  originId: 1,
  origin: {
    id: 1,
    description: "CORRENTE INTER"
  },
  statusId: 1,
  status: {
    id: 1,
    description: "Pago"
  },
  typeId: 1,
  type: {
    id: 1,
    description: "Receita"
  },
  tagIds: [],
  walletId: 1,
  wallet: {
    id: 1,
    description: "CARTEIRA 1"
  },
  createdAt: '2023-01-01',
  updatedAt: '2023-01-01'
}

describe('src/@core/infra/geteway/FinanceItemGeteway', () => {
  const financeItemGeteway = new FinanceItemGeteway(axios)
  let resultMock: unknown

  test('page', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        items: [itemResponse],
        page: 1,
        total: 1,
        limit: 15,
        lastPage: 1
      }
    })

    const result = await financeItemGeteway.page({
      period: '2023-01-01',
      walletId: 1
    })

    expect(result.data).toEqual({
      items: [itemParsed],
      page: 1,
      total: 1,
      limit: 15,
      lastPage: 1
    })
  })
  test('id', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: itemResponse
    })

    const result = await financeItemGeteway.id(2)

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

    const result = await financeItemGeteway.post({
      value: 12,
      date: '2023-01-01',
      enable: 1,
      originId: 1,
      statusId: 1,
      typeId: 1,
      walletId: 1,
      tagIds: [1],
      // obs: '',
      sort: 1,
      repeat: 'UNIQUE',
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

    const result = await financeItemGeteway.put(2, {
      value: 12,
      date: '2023-01-01',
      enable: 1,
      originId: 1,
      statusId: 1,
      typeId: 1,
      walletId: 1,
      tagIds: [1],
      // obs: '',
      sort: 1,
      repeat: 'UNIQUE',
    })

    expect(result.status).toBe(201)
    expect(result.data).toEqual(resultMock)
  })
  test('remove', async () => {
    jest.spyOn(axios, 'delete').mockResolvedValueOnce({
      status: 204,
      data: null
    })

    const result = await financeItemGeteway.remove(1)

    expect(result.status).toBe(204)
    expect(result.data).toBeNull()
  })
  test('enable', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      status: 204,
      data: null
    })

    const result = await financeItemGeteway.enabled(1)

    expect(result.status).toBe(204)
    expect(result.data).toBeNull()
  })
  test('disabled', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      status: 204,
      data: null
    })

    const result = await financeItemGeteway.disabled(1)

    expect(result.status).toBe(204)
    expect(result.data).toBeNull()
  })
})