import { IFinanceWallet } from '@/@core/domain/entities/finance-wallet'
import { financeWalletGatewayV1 } from './financeWalletGatewayV1'
import { http } from '../../http'

const itemResponse = {
  id: 1,
  description: 'Mercado',
  panel: 0,
  trashed: false
}
const itemParsed: IFinanceWallet = {
  id: 1,
  description: 'Mercado',
  panel: 0,
  trashed: false
}

describe('src/@core/infra/Gateway/FinanceWalletGateway', () => {
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

    const result = await financeWalletGatewayV1(http).page()

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

    const result = await financeWalletGatewayV1(http).get()

    expect(result.data).toEqual([itemParsed])
  })
  test('id', async () => {
    const responseMock = {
      status: 200,
      data: itemResponse
    }

    http.get = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeWalletGatewayV1(http).id(1)

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

    const result = await financeWalletGatewayV1(http).post({
      description: 'Carteira test'
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

    const result = await financeWalletGatewayV1(http).put(1, {
      description: 'Carteira test',
      panel: 1
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

    const result = await financeWalletGatewayV1(http).remove(1)

    expect(result.status).toBe(204)
    expect(result.data).toBeNull()
  })
  test('restore', async () => {
    const responseMock = {
      status: 204,
      data: null
    }

    http.get = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeWalletGatewayV1(http).restore(1)

    expect(result.status).toBe(204)
    expect(result.data).toBeNull()
  })
})
