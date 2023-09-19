import { renderUI, screen, act } from "@/@core/__tests__"
import { RenderResult, fireEvent, waitFor } from "@testing-library/react"
import { AuthSignInPage } from "./AuthSignInPage"
import { observerKey } from "@/@core/domain/observerKey"

describe('src/@core/presentation/views/auth.signIn/AuthSignInPage', () => {
  let wrapper: RenderResult

  const onSubmitMock = jest.fn()

  beforeEach(async () => {
    wrapper = await renderUI(<AuthSignInPage />)
  })
  afterAll(() => {
    wrapper.unmount()
  })

  it('render components', () => {
    expect(screen.queryByText('Bem vindo!')).toBeInTheDocument()
  })

  it('submit form fields invalid', async () => {
    // authSigninController.onSubmit = onSubmitMock

    const elInputEmail = screen.queryByTestId('input-email') as HTMLInputElement
    const elInputPassword = screen.queryByTestId('input-password') as HTMLInputElement
    const elButtonSubmit = screen.queryByTestId('button-submit') as HTMLButtonElement

    await act(() => {
      observerKey.publish('feedbackForm', 'login ou senha inválidos!')
      elButtonSubmit.click()
    })

    expect(screen.queryByText('Campo obrigatório')).toBeInTheDocument()
    expect(screen.queryByText('A senha no mínimo deve ter 6 caracteres')).toBeInTheDocument()

    expect(onSubmitMock).toBeCalledTimes(0)
  })

  it('submit form fields valid', async () => {
    // authSigninController.onSubmit = onSubmitMock

    const elInputEmail = screen.queryByTestId('input-email') as HTMLInputElement
    const elInputPassword = screen.queryByTestId('input-password') as HTMLInputElement
    const elButtonSubmit = screen.queryByTestId('button-submit') as HTMLButtonElement

    await waitFor(async () => {
      fireEvent.change(elInputEmail, { target: { value: 'test@email.us' } })
      fireEvent.change(elInputPassword, { target: { value: '123456' } })
    })

    await act(() => {
      elButtonSubmit.click()
    })

    expect(onSubmitMock).toBeCalledTimes(1)
  })
})