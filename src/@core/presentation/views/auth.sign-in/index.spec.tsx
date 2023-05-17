import { renderWithRedux } from "@/__tests__/utils/render"
import { AuthSignInPage } from "@/@core/presentation/auth.sign-in"
import { act, fireEvent } from "@testing-library/react"

const spyUserRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('/@core/presentation/auth.sign-in', () => {
  test('Render component', async () => {
    spyUserRouter.mockImplementationOnce(() => ({}))

    const { findByTestId } = renderWithRedux(<AuthSignInPage />)

    const elForm = await findByTestId('form')

    const elInputEmail = elForm.querySelector("input[name='email']") as HTMLInputElement

    const elInputPassword = elForm.querySelector("input[name='password']") as HTMLInputElement

    expect(elInputEmail.value).toBe('')

    expect(elInputPassword.value).toBe('')
  })

  test('validation message fields', async () => {
    spyUserRouter.mockImplementationOnce(() => ({}))

    const { findByTestId, container } = renderWithRedux(<AuthSignInPage />)

    const elForm = await findByTestId('form')

    const elInputEmail = elForm.querySelector("input[name='email']") as HTMLInputElement

    const elInputPassword = elForm.querySelector("input[name='password']") as HTMLInputElement

    const elButton = elForm.querySelector("button[type='submit']") as HTMLButtonElement

    await act(async () => {
      elButton.click()
    })

    expect(container.innerHTML).toMatch(/campo obrigatório/)

    await act(async () => {
      fireEvent.change(elInputEmail, {
        target: { value: 'email' }
      })
      fireEvent.change(elInputPassword, {
        target: { value: '12345' }
      })
      elButton.click()
    })

    expect(container.innerHTML).toMatch(/email inválido/)
    expect(container.innerHTML).toMatch(/a senha deve ter no mínimo 6 digitos/)
  })
  test('submit form Error request', async () => {
    const pushMock = jest.fn()

    spyUserRouter.mockImplementation(() => ({
      push: pushMock
    }))

    jest.spyOn(require('axios'), 'post').mockRejectedValueOnce({
      status: 201,
      response: {
        data: {
          "message": "Email ou senha invalidos"
        }
      }
    })
    const { findByTestId, container } = renderWithRedux(<AuthSignInPage />)

    const elForm = await findByTestId('form')

    const elInputEmail = elForm.querySelector("input[name='email']") as HTMLInputElement

    const elInputPassword = elForm.querySelector("input[name='password']") as HTMLInputElement

    const elButton = elForm.querySelector("button[type='submit']") as HTMLButtonElement

    await act(async () => {
      fireEvent.change(elInputEmail, {
        target: { value: 'test1@email.com' }
      })
      fireEvent.change(elInputPassword, {
        target: { value: '123456-7890' }
      })
      elButton.click()
    })

    expect(container.innerHTML).toMatch(/Email ou senha invalidos/)

    expect(pushMock).toBeCalledTimes(0)
  })

  test('submit form Error request', async () => {
    const pushMock = jest.fn()

    spyUserRouter.mockImplementation(() => ({
      push: pushMock
    }))

    jest.spyOn(require('axios'), 'post').mockResolvedValueOnce({
      status: 201,
      data: {
        "token": "123|ezggQAt4sd89E2mXm49PfopVV79BQLUyEd6ONj4r"
      }
    })

    jest.spyOn(require('axios'), 'get').mockResolvedValueOnce({
      status: 200,
      data: {
        "period": "2023-04",
        "user": {
          "id": 1,
          "name": "teste 1",
          "email": "test1@email.com"
        }
      }
    })

    jest.spyOn(require('axios'), 'get').mockResolvedValueOnce({
      status: 200,
      data: {
        "wallet_panel": {
          "id": 1,
          "description": "CARTEIRA 1",
          "json": {},
          "enable": "1",
          "panel": "1"
        },
        "wallet": [],
        "origin": [],
        "tag": [],
        "type": [],
        "status": [],
        "originType": []
      }
    })

    const { findByTestId, container } = renderWithRedux(<AuthSignInPage />)

    const elForm = await findByTestId('form')

    const elInputEmail = elForm.querySelector("input[name='email']") as HTMLInputElement

    const elInputPassword = elForm.querySelector("input[name='password']") as HTMLInputElement

    const elButton = elForm.querySelector("button[type='submit']") as HTMLButtonElement

    await act(async () => {
      fireEvent.change(elInputEmail, {
        target: { value: 'test1@email.com' }
      })
      fireEvent.change(elInputPassword, {
        target: { value: '123456' }
      })
      elButton.click()
    })

    expect(pushMock).toBeCalledTimes(1)
  })
})