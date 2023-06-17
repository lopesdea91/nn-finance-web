import axios from 'axios'
import { FinanceGeteway } from "@/@core/infra/geteway/FinanceGeteway"

const itemResponse = {
  "wallet_panel": {
    "id": 1,
    "description": "CARTEIRA 1",
    "enable": 0,
    "panel": 1
  },
  "wallet": [
    {
      "id": 1,
      "description": "CARTEIRA 1",
      "enable": 0,
      "panel": 1
    },
  ],
  "origin": [
    {
      "id": 2,
      "description": "Crédito INTER",
      "enable": "1",
      "type": {
        "id": 2,
        "description": "Cartão de Crédito"
      },
      "parent": null,
      "wallet": {
        "id": 1,
        "description": "CARTEIRA 1"
      }
    }
  ],
  "tag": [
    {
      "id": 2,
      "description": "Alimentação",
      "enable": 1,
      "type": {
        "id": 2,
        "description": "Despesa"
      },
      "wallet": {
        "id": 1,
        "description": "CARTEIRA 1"
      }
    },
  ],
  "type": [
    {
      "id": 1,
      "description": "Receita"
    },
    {
      "id": 2,
      "description": "Despesa"
    }
  ],
  "status": [
    {
      "id": 1,
      "description": "Pago"
    },
    {
      "id": 2,
      "description": "Pendente"
    },
    {
      "id": 3,
      "description": "Talvez"
    }
  ],
  "origin_type": [
    {
      "id": 4,
      "description": "Cartão Beneficio"
    },
  ]
}

describe('src/@core/infra/geteway/FinanceGeteway', () => {
  const financeGeteway = new FinanceGeteway(axios)

  test('data', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: itemResponse
    })

    const result = await financeGeteway.data()

    expect(result.data.walletPanel).toEqual({
      "id": 1,
      "description": "CARTEIRA 1",
      "enable": 0,
      "panel": 1
    })

    expect(result.data.wallet).toHaveLength(1)
    expect(result.data.wallet[0]).toEqual({
      "id": 1,
      "description": "CARTEIRA 1",
      "enable": 0,
      "panel": 1
    })

    expect(result.data.origin).toHaveLength(1)
    expect(result.data.origin[0]).toEqual({
      "id": 2,
      "description": "Crédito INTER",
      "enable": "1",
      "typeId": 2,
      "type": {
        "id": 2,
        "description": "Cartão de Crédito"
      },
      "parentId": undefined,
      "parent": null,
      "walletId": 1,
      "wallet": {
        "id": 1,
        "description": "CARTEIRA 1"
      }
    })

    expect(result.data.tag).toHaveLength(1)
    expect(result.data.tag[0]).toEqual({
      "id": 2,
      "description": "Alimentação",
      "enable": 1,
      "typeId": 2,
      "type": {
        "id": 2,
        "description": "Despesa"
      },
      "walletId": 1,
      "wallet": {
        "id": 1,
        "description": "CARTEIRA 1"
      }
    },)
    expect(result.data.type).toHaveLength(2)
    expect(result.data.type[0]).toEqual({
      "id": 1,
      "description": "Receita"
    })

    expect(result.data.status[0]).toEqual({
      "id": 1,
      "description": "Pago"
    })

    expect(result.data.originType).toHaveLength(1)
    expect(result.data.originType[0]).toEqual({
      "id": 4,
      "description": "Cartão Beneficio"
    })


  })
})