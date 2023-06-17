import axios from 'axios'
import { FinanceWalletGeteway } from "@/@core/infra/geteway/FinanceWalletGeteway"
import { FinanceWallet } from '@/types/entities/finance-wallet'

const itemResponse = {
  id: 1,
  description: 'Mercado',
  enable: 1,
  panel: 0,
}
const itemParsed: FinanceWallet = {
  id: 1,
  description: 'Mercado',
  enable: 1,
  panel: 0,
}

describe('src/@core/infra/geteway/FinanceWalletGeteway', () => {
  const financeWalletGeteway = new FinanceWalletGeteway(axios)
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

    const result = await financeWalletGeteway.page()

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

    const result = await financeWalletGeteway.get()

    expect(result.data).toEqual([itemParsed])
  })
  test('id', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: itemResponse
    })

    const result = await financeWalletGeteway.id(1)

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

    const result = await financeWalletGeteway.post({
      description: 'Carteira test',
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

    const result = await financeWalletGeteway.put(1, {
      description: 'Carteira test',
      enable: 1,
      panel: 1
    })

    expect(result.status).toEqual(201)
    expect(result.data).toEqual(resultMock)
  })
  test('remove', async () => {
    jest.spyOn(axios, 'delete').mockResolvedValueOnce({
      status: 204,
      data: null
    })

    const result = await financeWalletGeteway.remove(1)

    expect(result.status).toBe(204)
    expect(result.data).toBeNull()
  })
  test('enable', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      status: 204,
      data: null
    })

    const result = await financeWalletGeteway.enabled(1)

    expect(result.status).toBe(204)
    expect(result.data).toBeNull()
  })
  test('disabled', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      status: 204,
      data: null
    })

    const result = await financeWalletGeteway.disabled(1)

    expect(result.status).toBe(204)
    expect(result.data).toBeNull()
  })

})