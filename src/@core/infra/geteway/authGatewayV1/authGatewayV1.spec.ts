import { http } from '../../http'
import { authGatewayV1 } from './authGatewayV1'

describe('src/@core/infra/Gateway/authGatewayV1', () => {
  test('signIn', async () => {
    const responseMock = {
      status: 201,
      data: {
        token: 'token#123'
      }
    }

    http.post = jest.fn().mockResolvedValueOnce(responseMock)

    const result = await authGatewayV1(http).signIn({
      email: 'email@email.com',
      password: '123456'
    })

    expect(result.status).toBe(201)
    expect(result.data.token).toBe('token#123')
  })

  test('signOut', async () => {
    const responseMock = {
      status: 201
    }

    http.post = jest.fn().mockReturnValueOnce(responseMock)

    const result = await authGatewayV1(http).signOut()

    expect(result.status).toBe(201)
  })
})
