import { http } from '../../http'
import { financeConsolidationGatewayV1 } from './financeConsolidationGatewayV1'

describe('src/@core/infra/Gateway/financeConsolidationGatewayV1', () => {
  test('processMonth', async () => {
    const responseMock = {
      status: 200,
      data: { message: 'OK' }
    }

    http.post = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeConsolidationGatewayV1(http).processMonth({
      period: '2023-01',
      walletId: 1
    })

    expect(result.status).toBe(200)
    expect(result.data.message).toEqual('OK')
  })
  test('createMonthComposition', async () => {
    const responseMock = {
      status: 201,
      data: { message: 'Composição criada' }
    }

    http.post = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeConsolidationGatewayV1(http).createMonthComposition({
      consolidationId: 1,
      composition: [
        {
          tagId: 6,
          percentageLimit: 6.12
        }
      ]
    })

    expect(result.status).toBe(201)
    expect(result.data.message).toEqual('Composição criada')
  })
  test('updateMonthComposition form1', async () => {
    const responseMock = {
      status: 201,
      data: { message: 'Composição criada' }
    }

    http.put = jest.fn().mockReturnValueOnce(responseMock)

    const result1 = await financeConsolidationGatewayV1(http).updateMonthComposition({
      consolidationId: 1,
      composition: [
        {
          id: 2,
          tagId: 7
        }
      ]
    })
    expect(result1.status).toBe(201)
    expect(result1.data.message).toEqual('Composição criada')
  })
  test('updateMonthComposition form2', async () => {
    const responseMock = {
      status: 201,
      data: { message: 'Composição atualizada' }
    }

    http.put = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeConsolidationGatewayV1(http).updateMonthComposition({
      consolidationId: 1,
      composition: [
        {
          id: 2,
          percentageLimit: 6.15
        }
      ]
    })
    expect(result.status).toBe(201)
    expect(result.data.message).toEqual('Composição atualizada')
  })
  test('removeMonthComposition', async () => {
    const responseMock = {
      status: 204,
      data: null
    }

    http.delete = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeConsolidationGatewayV1(http).removeMonthComposition({
      consolidationId: 1,
      compositionId: 2
    })

    expect(result.status).toBe(204)
  })

  // month
  test('monthConsolidation', async () => {
    const responseMock = {
      status: 200,
      data: {
        consolidation_id: 1
      }
    }

    http.get = jest.fn().mockReturnValueOnce(responseMock)

    const result1 = await financeConsolidationGatewayV1(http).monthConsolidation({
      walletId: 1,
      period: '2023-01'
    })

    expect(result1.status).toBe(200)
    expect(result1.data.consolidationId).toEqual(1)

    responseMock.status = 204

    http.get = jest.fn().mockReturnValueOnce(responseMock)

    const result2 = await financeConsolidationGatewayV1(http).monthConsolidation({
      walletId: 1,
      period: '2023-01'
    })

    expect(result2.status).toBe(204)
    expect(result2.data.consolidationId).toBeUndefined()
  })
  test('monthBalance', async () => {
    const responseMock = {
      status: 200,
      data: {
        revenue: 0,
        expense: 7.15,
        available: -7.15,
        estimate: -157.15
      }
    }
    http.get = jest.fn().mockReturnValueOnce(responseMock)

    const result1 = await financeConsolidationGatewayV1(http).monthBalance({
      consolidationId: 1,
      walletId: 1
    })

    expect(result1.status).toBe(200)
    expect(result1.data).toEqual({
      revenue: 0,
      expense: 7.15,
      available: -7.15,
      estimate: -157.15
    })

    responseMock.status = 204
    http.get = jest.fn().mockReturnValueOnce(responseMock)

    const result2 = await financeConsolidationGatewayV1(http).monthBalance({
      consolidationId: 1,
      walletId: 1
    })

    expect(result2.status).toBe(204)
  })
  test('monthComposition', async () => {
    const responseMock = {
      status: 200,
      data: [
        {
          id: 1,
          value_current: 1,
          value_limit: 1,
          percentage_limit: 1,
          percentage_current: 1,
          tag: {
            id: 1,
            description: 'tag desc'
          },
          consolidation_id: 1
        }
      ]
    }
    http.get = jest.fn().mockReturnValueOnce(responseMock)

    const result1 = await financeConsolidationGatewayV1(http).monthComposition({
      consolidationId: 1,
      walletId: 1
    })

    expect(result1.status).toBe(200)
    expect(result1.data[0]).toEqual({
      id: 1,
      valueCurrent: 1,
      valueLimit: 1,
      percentageLimit: 1,
      percentageCurrent: 1,
      tagId: 1,
      tagDescription: 'tag desc',
      consolidationId: 1
    })

    responseMock.status = 204
    http.get = jest.fn().mockReturnValueOnce(responseMock)

    const result2 = await financeConsolidationGatewayV1(http).monthComposition({
      consolidationId: 1,
      walletId: 1
    })

    expect(result2.status).toBe(204)
  })

  test('composition', async () => {
    const responseMock = {
      status: 200,
      data: [
        {
          id: 2,
          value_current: 0,
          value_limit: 0,
          percentage_limit: 6,
          percentage_current: 0,
          tag_id: 7,
          consolidation_id: 1,
          tag: {
            id: 7,
            description: 'Combustivel'
          }
        }
      ]
    }

    http.get = jest.fn().mockReturnValueOnce(responseMock)

    const result = await financeConsolidationGatewayV1(http).monthComposition({
      consolidationId: 1,
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
  test('monthOriginTransactional', async () => {
    const responseMock = {
      status: 200,
      data: [
        {
          id: 39,
          sum: -7.15,
          revenue: 0,
          expense: 7.15,
          average: 0,
          origin_id: 1,
          consolidation_id: 1,
          origin: {
            id: 1,
            description: 'BANCO INTERR'
          }
        }
      ]
    }

    http.get = jest.fn().mockReturnValueOnce(responseMock)

    const result1 = await financeConsolidationGatewayV1(http).monthOriginTransactional({
      consolidationId: 1,
      walletId: 1
    })

    expect(result1.status).toBe(200)
    expect(result1.data).toHaveLength(1)
    expect(result1.data[0]).toEqual({
      id: 39,
      // sum: -7.15,
      revenue: 0,
      expense: 7.15,
      average: 0,
      originId: 1,
      originDescription: 'BANCO INTERR',
      consolidationId: 1
    })

    responseMock.status = 204

    http.get = jest.fn().mockReturnValueOnce(responseMock)

    const result2 = await financeConsolidationGatewayV1(http).monthOriginTransactional({
      consolidationId: 1,
      walletId: 1
    })

    expect(result2.status).toBe(204)

  })
  test('monthOriginCredit', async () => {
    const responseMock = {
      status: 200,
      data: [
        {
          id: 2,
          sum: 10.75,
          origin_id: 1,
          consolidation_id: 1,
          origin: {
            id: 1,
            description: 'INTER CRÉDITO'
          }
        }
      ]
    }

    http.get = jest.fn().mockReturnValueOnce(responseMock)

    const result1 = await financeConsolidationGatewayV1(http).monthOriginCredit({
      consolidationId: 1,
      walletId: 1
    })

    expect(result1.status).toBe(200)
    expect(result1.data).toHaveLength(1)
    expect(result1.data[0]).toEqual({
      id: 2,
      sum: 10.75,
      originId: 1,
      originDescription: 'INTER CRÉDITO',
      consolidationId: 1
    })

    responseMock.status = 204

    http.get = jest.fn().mockReturnValueOnce(responseMock)
    
    const result2 = await financeConsolidationGatewayV1(http).monthOriginCredit({
      consolidationId: 1,
      walletId: 1
    })

    expect(result2.status).toBe(204)
  })
  test('yearBalance', async () => {
    const responseMock = {
      status: 200,
      data: [
        {
          label: '01-2023',
          month: 1,
          balance: {
            revenue: 150,
            expense: 50
          }
        }
      ]
    }

    http.get = jest.fn().mockResolvedValueOnce(responseMock)

    const result = await financeConsolidationGatewayV1(http).yearBalance({
      walletId: 1,
      consolidationId: 1,
      period: '2023-01'
    })

    expect(result.status).toBe(200)
    expect(result.data).toHaveLength(1)
    expect(result.data[0]).toEqual({
      label: '01-2023',
      month: 1,
      balance: {
        revenue: 150,
        expense: 50
      }
    })
  })
})
