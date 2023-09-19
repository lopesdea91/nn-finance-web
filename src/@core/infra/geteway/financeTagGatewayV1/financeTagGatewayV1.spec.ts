import { IFinanceTag } from '@/@core/domain/entities/finance-tag'
import { financeTagGatewayV1 } from './financeTagGatewayV1'
import { http } from '../../http'

const itemResponse = {
  id: 1,
  description: 'Mercado',
  type: {
    id: 2,
    description: 'Despesa'
  },
  wallet: {
    id: 1,
    description: 'CARTEIRA 1'
  },
  trashed: false
}
const itemParsed: IFinanceTag = {
  id: 1,
  description: 'Mercado',
  type: {
    id: 2,
    description: 'Despesa'
  },
  typeId: 2,
  wallet: {
    id: 1,
    description: 'CARTEIRA 1'
  },
  walletId: 1,
  trashed: false
}

describe('src/@core/infra/Gateway/FinanceTagGateway', () => {
  test('page', async () => {
    const responseMock = {
      data: {
        items: [itemResponse],
        page: 1,
        total: 9,
        limit: 15,
        lastPage: 1
      }
    }

    http.get = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeTagGatewayV1(http).page()

    expect(result.data).toEqual({
      items: [itemParsed],
      page: 1,
      total: 9,
      limit: 15,
      lastPage: 1
    })
  })
  test('get', async () => {
    const responseMock = {
      data: [itemResponse]
    }

    http.get = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeTagGatewayV1(http).get()

    expect(result.data).toEqual([itemParsed])
  })
  test('id', async () => {
    const responseMock = {
      data: itemResponse
    }

    http.get = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeTagGatewayV1(http).id(1)

    expect(result.data).toEqual(itemParsed)
  })
  test('post', async () => {
    const responseMock = {
      status: 201,
      data: {
        message: 'Item criado'
      }
    }

    http.post = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeTagGatewayV1(http).post({
      description: 'Mercado',
      typeId: 1,
      walletId: 1
    })

    expect(result.status).toBe(201)
    expect(result.data.message).toEqual('Item criado')
  })
  test('put', async () => {
    const responseMock = {
      status: 201,
      data: {
        message: 'Item atualizado'
      }
    }

    http.put = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeTagGatewayV1(http).put(1, {
      description: 'Mercado',
      typeId: 1,
      walletId: 1
    })

    expect(result.status).toEqual(201)
    expect(result.data.message).toEqual('Item atualizado')
  })
  test('remove', async () => {
    const responseMock = {
      status: 204,
      data: null
    }

    http.delete = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeTagGatewayV1(http).remove(1)

    expect(result.status).toBe(204)
    expect(result.data).toBeNull()
  })
  test('restore', async () => {
    const responseMock = {
      status: 204,
      data: null
    }

    http.get = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeTagGatewayV1(http).restore(1)

    expect(result.status).toBe(204)
    expect(result.data).toBeNull()
  })
})
