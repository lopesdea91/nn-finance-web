import { IFinanceOrigin } from '@/@core/domain/entities/finance-origin'
import { financeOriginGatewayV1 } from './financeOriginGatewayV1'
import { http } from '../../http'

const itemResponse = {
  id: 1,
  description: 'Inter Corrente',
  type: {
    id: 1,
    description: 'Conta Corrente'
  },
  parent: null,
  wallet: {
    id: 1,
    description: 'CARTEIRA 1'
  },
  trashed: false
}
const itemParsed: IFinanceOrigin = {
  id: 1,
  description: 'Inter Corrente',
  type: {
    id: 1,
    description: 'Conta Corrente'
  },
  typeId: 1,
  wallet: {
    id: 1,
    description: 'CARTEIRA 1'
  },
  walletId: 1,
  parent: null,
  parentId: null,
  trashed: false
}

describe('src/@core/infra/Gateway/FinanceOriginGateway', () => {
  test('page', async () => {
    const responseMock = {
      status: 200,
      data: {
        items: [itemResponse],
        page: 1,
        total: 9,
        limit: 15,
        lastPage: 1
      }
    }

    http.get = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeOriginGatewayV1(http).page()

    expect(result.status).toBe(200)
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
      status: 200,
      data: [itemResponse]
    }

    http.get = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeOriginGatewayV1(http).get()

    expect(result.status).toBe(200)
    expect(result.data).toEqual([itemParsed])
  })
  test('id', async () => {
    const responseMock = {
      status: 200,
      data: itemResponse
    }

    http.get = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeOriginGatewayV1(http).id(2)

    expect(result.status).toBe(200)
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

    const result = await financeOriginGatewayV1(http).post({
      description: 'Text exanple',
      parentId: null,
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

    const result = await financeOriginGatewayV1(http).put(2, {
      description: 'text example',
      parentId: null,
      typeId: 1,
      walletId: 1
    })

    expect(result.status).toBe(201)
    expect(result.data.message).toEqual('Item atualizado')
  })
  test('remove', async () => {
    const responseMock = {
      status: 204,
      data: null
    }

    http.delete = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeOriginGatewayV1(http).remove(1)

    expect(result.status).toBe(204)
    expect(result.data).toBeNull()
  })
  test('restore', async () => {
    http.get = jest.fn().mockReturnValueOnce({
      status: 204,
      data: null
    })

    const result = await financeOriginGatewayV1(http).restore(1)

    expect(result.status).toBe(204)
    expect(result.data).toBeNull()
  })
})
