import axios from 'axios'
import { AuthGeteway } from "@/@core/infra/geteway/AuthGeteway"

describe('src/@core/infra/geteway/AuthGeteway', () => {
  const authGeteway = new AuthGeteway(axios)
  let resultMock: unknown

  test('signIn', async () => {
    resultMock = {
      token: 'token#123'
    }

    jest.spyOn(axios, 'post').mockResolvedValueOnce({
      data: resultMock
    })

    const result = await authGeteway.signIn({
      email: 'email@email.com',
      password: '123456',
    })

    expect(result.data).toEqual(resultMock)
  })
  test('signOut', async () => {
    jest.spyOn(axios, 'post').mockResolvedValueOnce({
      data: null
    })

    const result = await authGeteway.signOut()

    expect(result.data).toBeNull
  })
})