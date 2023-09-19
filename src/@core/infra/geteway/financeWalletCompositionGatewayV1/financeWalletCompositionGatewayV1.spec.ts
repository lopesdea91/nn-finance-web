import { IFinanceWallet } from '@/@core/domain/entities/finance-wallet'
import { financeWalletCompositionGatewayV1 } from './financeWalletCompositionGatewayV1'
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

describe('src/@core/infra/Gateway/financeWalletCompositionGatewayV1', () => {
  test('get', async () => {
    http.get = jest.fn().mockReturnValueOnce({
      status: 204,
      data: []
    })

    const result1 = await financeWalletCompositionGatewayV1(http).get({ walletId: 1 })

    expect(result1.status).toBe(204)
    expect(result1.data).toHaveLength(0)

    http.get = jest.fn().mockReturnValueOnce({
      status: 200,
      data: [itemResponse]
    })

    const result2 = await financeWalletCompositionGatewayV1(http).get({ walletId: 1 })

    expect(result2.status).toBe(200)
    expect(result2.data).toHaveLength(1)
  })
  test('put', async () => {
    const responseMock = {
      status: 201,
      data: {
        message: 'composição atualizada'
      }
    }

    http.put = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeWalletCompositionGatewayV1(http).put({
      composition: [
        {
          tagId: 1,
          percentageLimit: 20
        }
      ],
      walletId: 1
    })

    expect(result.status).toEqual(201)
    expect(result.data.message).toEqual('composição atualizada')
  })
  test('remove', async () => {
    const responseMock = {
      status: 204,
      data: null
    }

    http.delete = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeWalletCompositionGatewayV1(http).remove({ compositionId: 1, walletId: 1 })

    expect(result.status).toBe(204)
  })
})
