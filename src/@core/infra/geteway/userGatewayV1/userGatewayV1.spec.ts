import { userGatewayV1 } from './userGatewayV1'
import { http } from '../../http'

describe('src/@core/infra/Gateway/userGateway', () => {
  test('data', async () => {
    const responseMock = {
      status: 200,
      data: {
        user: {
          id: 1,
          name: 'user test',
          email: 'email@test.com'
        }
      }
    }

    http.get = jest.fn().mockReturnValueOnce(responseMock)

    const result = await userGatewayV1(http).data()

    expect(result.status).toBe(200)
    expect(result.data).toEqual({
      user: {
        id: 1,
        name: 'user test',
        email: 'email@test.com'
      }
    })
  })
  test('updateData', async () => {
    const responseMock = {
      data: {
        message: 'Dados atualizados'
      }
    }

    http.put = jest.fn().mockReturnValueOnce(responseMock)

    const result = await userGatewayV1(http).updateData({
      name: 'name teste',
      email: 'email@test.com'
    })

    expect(result.data.message).toBe('Dados atualizados')
  })
  test('updateSecury', async () => {
    const responseMock = {
      data: {
        message: 'Senha atualizada'
      }
    }

    http.put = jest.fn().mockReturnValueOnce(responseMock)

    const result = await userGatewayV1(http).updateSecury({
      password: '123456'
    })

    expect(result.data.message).toBe('Senha atualizada')
  })
})
