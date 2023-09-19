import { http } from '../../http'
import { financeGatewayV1 } from './financeGatewayV1'

const itemResponse = {
  wallet_panel: {
    id: 1,
    description: 'CARTEIRA 1',
    enable: 0,
    panel: 1
  },
  wallet: [
    {
      id: 1,
      description: 'CARTEIRA 1',
      enable: 0,
      panel: 1
    }
  ],
  origin: [
    {
      id: 2,
      description: 'Crédito INTER',
      enable: '1',
      type: {
        id: 2,
        description: 'Cartão de Crédito'
      },
      parent: null,
      wallet: {
        id: 1,
        description: 'CARTEIRA 1'
      }
    }
  ],
  tag: [
    {
      id: 2,
      description: 'Alimentação',
      enable: 1,
      type: {
        id: 2,
        description: 'Despesa'
      },
      wallet: {
        id: 1,
        description: 'CARTEIRA 1'
      }
    }
  ],
  type: [
    {
      id: 1,
      description: 'Receita'
    },
    {
      id: 2,
      description: 'Despesa'
    }
  ],
  status: [
    {
      id: 1,
      description: 'Pago'
    },
    {
      id: 2,
      description: 'Pendente'
    },
    {
      id: 3,
      description: 'Talvez'
    }
  ],
  origin_type: [
    {
      id: 4,
      description: 'Cartão Beneficio'
    }
  ]
}

describe('src/@core/infra/Gateway/ApiV1/FinanceGateway', () => {
  test('fetch data', async () => {
    http.get = jest.fn().mockReturnValue({
      data: itemResponse
    })

    const result = await financeGatewayV1(http).data()

    /** walletPanel */
    expect(result.data.walletPanel).toEqual({
      id: 1,
      description: 'CARTEIRA 1',
      enable: 0,
      panel: 1
    })

    /** wallet */
    expect(result.data.wallet).toHaveLength(1)
    expect(result.data.wallet[0]).toEqual({
      id: 1,
      description: 'CARTEIRA 1',
      enable: 0,
      panel: 1
    })

    /** origin */
    expect(result.data.origin).toHaveLength(1)
    expect(result.data.origin[0]).toEqual({
      id: 2,
      description: 'Crédito INTER',
      enable: '1',
      typeId: 2,
      type: {
        id: 2,
        description: 'Cartão de Crédito'
      },
      parentId: null,
      parent: null,
      walletId: 1,
      wallet: {
        id: 1,
        description: 'CARTEIRA 1'
      }
    })

    /** tag */
    expect(result.data.tag).toHaveLength(1)
    expect(result.data.tag[0]).toEqual({
      id: 2,
      description: 'Alimentação',
      enable: 1,
      typeId: 2,
      type: {
        id: 2,
        description: 'Despesa'
      },
      walletId: 1,
      wallet: {
        id: 1,
        description: 'CARTEIRA 1'
      }
    })

    /** type */
    expect(result.data.type).toHaveLength(2)
    expect(result.data.type[0]).toEqual({
      id: 1,
      description: 'Receita'
    })

    /** status */
    expect(result.data.status[0]).toEqual({
      id: 1,
      description: 'Pago'
    })

    /** originType */
    expect(result.data.originType).toHaveLength(1)
    expect(result.data.originType[0]).toEqual({
      id: 4,
      description: 'Cartão Beneficio'
    })
  })
})
