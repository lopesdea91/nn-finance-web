import axios from 'axios'
import { UserGeteway } from "@/@core/infra/geteway/UserGeteway"

describe('src/@core/infra/geteway/UserGeteway', () => {
  const userGeteway = new UserGeteway(axios)
  let resultMock: unknown

  test('data', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      status: 200,
      data: {
        user: {
          id: 1,
          name: 'user test',
          email: 'email@test.com'
        }
      }
    })

    const result = await userGeteway.data()

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
    resultMock = {
      message: 'Dados atualizados'
    }

    jest.spyOn(axios, 'put').mockResolvedValueOnce({
      data: resultMock
    })

    const result = await userGeteway.updateData({
      name: 'name teste',
      email: 'email@test.com'
    })

    expect(result.data).toEqual(resultMock)
  })
  test('updateSecury', async () => {
    resultMock = {
      message: 'Senha atualizada'
    }

    jest.spyOn(axios, 'put').mockResolvedValueOnce({
      data: resultMock
    })

    const result = await userGeteway.updateSecury({
      password: '123456'
    })

    expect(result.data).toEqual(resultMock)

  })
})