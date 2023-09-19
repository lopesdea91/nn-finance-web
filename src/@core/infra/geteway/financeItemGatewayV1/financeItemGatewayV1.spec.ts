import { IFinanceItem } from '@/@core/domain/entities/finance-item'
import { financeItemGatewayV1 } from './financeItemGatewayV1'
import { http } from '../../http'

const itemResponse = {
  id: 1,
  value: 1,
  date: '2023-15-01',
  sort: 1,
  obs: '',
  origin: {
    id: 1,
    description: 'CORRENTE INTER'
  },
  status: {
    id: 1,
    description: 'Pago'
  },
  type: {
    id: 1,
    description: 'Receita'
  },
  tag_ids: [],
  wallet: {
    id: 1,
    description: 'CARTEIRA 1'
  },
  trashed: false
}
const itemParsed: IFinanceItem = {
  id: 1,
  value: 1,
  date: '2023-15-01',
  sort: 1,
  obs: '',
  originId: 1,
  origin: {
    id: 1,
    description: 'CORRENTE INTER'
  },
  statusId: 1,
  status: {
    id: 1,
    description: 'Pago'
  },
  typeId: 1,
  type: {
    id: 1,
    description: 'Receita'
  },
  tagIds: [],
  walletId: 1,
  wallet: {
    id: 1,
    description: 'CARTEIRA 1'
  },
  trashed: false
}

describe('src/@core/infra/Gateway/FinanceItemGateway', () => {
  test('page', async () => {
    const responseMock = {
      status: 200,
      data: {
        items: [itemResponse],
        page: 1,
        total: 1,
        limit: 15,
        lastPage: 1
      }
    }

    http.get = jest.fn().mockReturnValueOnce(responseMock)

    const result1 = await financeItemGatewayV1(http).page({
      minDate: '2023-01-01',
      walletId: 1
    })

    expect(result1.status).toBe(200)
    expect(result1.data).toEqual({
      items: [itemParsed],
      page: 1,
      total: 1,
      limit: 15,
      lastPage: 1
    })

    responseMock.status = 204

    http.get = jest.fn().mockReturnValueOnce(responseMock)

    const result2 = await financeItemGatewayV1(http).page({
      minDate: '2023-01-01',
      walletId: 1
    })

    expect(result2.status).toBe(204)
  })
  test('id', async () => {
    const responseMock = {
      status: 200,
      data: itemResponse
    }

    http.get = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeItemGatewayV1(http).id(2)

    expect(result.status).toBe(200)
    expect(result.data).toEqual(itemParsed)
  })
  test('post', async () => {
    const responseMock = {
      status: 201,
      data: { message: 'Item criado' }
    }

    http.post = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeItemGatewayV1(http).post({
      value: 12,
      date: '2023-01-01',
      originId: 1,
      statusId: 1,
      typeId: 1,
      walletId: 1,
      tagIds: [1],
      obs: '',
      sort: 1,
      repeat: 'UNIQUE'
    })

    expect(result.status).toBe(201)
    expect(result.data).toEqual({ message: 'Item criado' })
  })
  test('put', async () => {
    const responseMock = {
      status: 201,
      data: { message: 'Item atualizado' }
    }

    http.put = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeItemGatewayV1(http).put(2, {
      value: 12,
      date: '2023-01-01',
      originId: 1,
      statusId: 1,
      typeId: 1,
      walletId: 1,
      tagIds: [1],
      obs: '',
      sort: 1,
      repeat: 'UNIQUE'
    })

    expect(result.status).toBe(201)
    expect(result.data).toEqual({ message: 'Item atualizado' })
  })
  test('remove', async () => {
    const responseMock = {
      status: 204,
      data: null
    }

    http.delete = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeItemGatewayV1(http).remove(1)

    expect(result.status).toBe(204)
    expect(result.data).toBeNull()
  })
  test('restore', async () => {
    const responseMock = {
      status: 204,
      data: null
    }

    http.get = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeItemGatewayV1(http).restore(1)

    expect(result.status).toBe(204)
    expect(result.data).toBeNull()
  })
  test('status', async () => {
    const responseMock = {
      status: 201,
      data: null
    }

    http.post = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeItemGatewayV1(http).status(1, 1)

    console.log('... result', result);
    

    expect(result.status).toBe(201)
    expect(result.data).toBeNull()
  })
})
