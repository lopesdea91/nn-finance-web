import axios from 'axios'
import { FinanceWalletConsolidationGeteway } from "@/@core/infra/geteway/FinanceWalletConsolidationGeteway"

describe('src/@core/infra/geteway/FinanceWalletConsolidationGeteway', () => {
  const financeWalletConsolidationGeteway = new FinanceWalletConsolidationGeteway(axios)
  let resultMock: unknown

  test('processMonth', async () => {
    resultMock = {
      message: 'OK'
    }

    jest.spyOn(axios, 'post').mockResolvedValueOnce({
      status: 200,
      data: resultMock
    })

    const result = await financeWalletConsolidationGeteway.processMonth({
      period: '2023-01',
      walletId: 1
    })

    expect(result.status).toBe(200)
    expect(result.data).toEqual(resultMock)
  })
  test('createMonthComposition', async () => {
    resultMock = {
      message: 'Composição criada'
    }

    jest.spyOn(axios, 'post').mockResolvedValueOnce({
      status: 201,
      data: resultMock
    })

    const result = await financeWalletConsolidationGeteway.createMonthComposition({
      consolidation_id: 1,
      composition: [
        {
          tagId: 6,
          percentageLimit: 6.12
        }
      ]
    })

    expect(result.status).toBe(201)
    expect(result.data).toEqual(resultMock)
  })
  test('updateMonthComposition form1', async () => {
    resultMock = {
      message: 'Composição criada'
    }

    jest.spyOn(axios, 'put').mockResolvedValueOnce({
      status: 201,
      data: resultMock
    })

    const result1 = await financeWalletConsolidationGeteway.updateMonthComposition({
      consolidation_id: 1,
      composition: [
        {
          id: 2,
          tagId: 7
        }
      ]
    })
    expect(result1.status).toBe(201)
    expect(result1.data).toEqual(resultMock)
  })
  test('updateMonthComposition form2', async () => {
    resultMock = {
      message: 'Composição criada'
    }

    jest.spyOn(axios, 'put').mockResolvedValueOnce({
      status: 201,
      data: resultMock
    })

    const result2 = await financeWalletConsolidationGeteway.updateMonthComposition({
      consolidation_id: 1,
      composition: [
        {
          id: 2,
          percentageLimit: 6.15
        }
      ]
    })
    expect(result2.status).toBe(201)
    expect(result2.data).toEqual(resultMock)
  })
  test('balance', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      status: 200,
      data: {
        revenue: 0,
        expense: 7.15,
        available: -7.15,
        estimate: -157.15
      }
    })

    const result = await financeWalletConsolidationGeteway.balance({
      period: '2023-01',
      walletId: 1
    })

    expect(result.status).toBe(200)
    expect(result.data).toEqual({
      revenue: 0,
      expense: 7.15,
      available: -7.15,
      estimate: -157.15
    })
  })
  test('composition', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      status: 200,
      data: [
        {
          "id": 2,
          "value_current": 0,
          "value_limit": 0,
          "percentage_limit": 6,
          "percentage_current": 0,
          "tag_id": 7,
          "consolidation_id": 1,
          "tag": {
            "id": 7,
            "description": "Combustivel"
          }
        }
      ]
    })

    const result = await financeWalletConsolidationGeteway.composition({
      period: '2023-01',
      walletId: 1
    })

    expect(result.status).toBe(200)
    expect(result.data).toHaveLength(1)
    expect(result.data[0]).toEqual({
      id: 2,
      valueCurrent: 0,
      valueLimit: 0,
      percentageLimit: 6,
      percentageCurrent: 0,
      tagId: 7,
      tagDescription: 'Combustivel',
      consolidationId: 1
    })
  })
  test('originTransactional', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      status: 200,
      data: [{
        "id": 39,
        "sum": -7.15,
        "revenue": 0,
        "expense": 7.15,
        "average": 0,
        "origin_id": 1,
        "consolidation_id": 1,
        "origin": {
          "id": 1,
          "description": "BANCO INTERR"
        }
      }]
    })

    const result = await financeWalletConsolidationGeteway.originTransactional({
      period: '2023-01',
      walletId: 1
    })

    expect(result.status).toBe(200)
    expect(result.data).toHaveLength(1)
    expect(result.data[0]).toEqual({
      id: 39,
      sum: -7.15,
      revenue: 0,
      expense: 7.15,
      average: 0,
      originId: 1,
      originDescription: 'BANCO INTERR',
      consolidationId: 1
    })
  })
  test('originCredit', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      status: 200,
      data: [{
        "id": 2,
        "sum": 10.75,
        "origin_id": 1,
        "consolidation_id": 1,
        "origin": {
          "id": 1,
          "description": "INTER CRÉDITO"
        }
      }]
    })

    const result = await financeWalletConsolidationGeteway.originCredit({
      period: '2023-01',
      walletId: 1
    })

    expect(result.status).toBe(200)
    expect(result.data).toHaveLength(1)
    expect(result.data[0]).toEqual({
      id: 2,
      sum: 10.75,
      originId: 1,
      originDescription: 'INTER CRÉDITO',
      consolidationId: 1
    })
  })
})
