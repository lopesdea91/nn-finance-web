import { fireEvent, waitFor } from "@testing-library/react"
import { renderUI, screen, act, itemOriginMock1 } from "@/@core/__tests__"
import { appCookie } from "@/@core/infra/memory"
import { financeOriginObserver, loadingObserver, observer, redirectObserver } from "@/@core/domain/observer"
import { observerKey } from "@/@core/domain/observerKey"
import { FinanceOriginIdPage } from "./FinanceOriginIdPage"
import { PageProps } from "./FinanceOriginIdPage.type"
import { pageMethods } from "./FinanceOriginIdPage.methods"

jest.mock('@/@core/infra/geteway', () => ({
  ...jest.requireActual('@/@core/infra/geteway')
}))
jest.mock('@/@core/infra/http', () => ({
  ...jest.requireActual('@/@core/infra/http')
}))

describe('src/@core/presentation/views/finance.origin/FinanceOriginIdtPage', () => {
  const props: PageProps = {
    item: itemOriginMock1
  }

  /** spy */
  const onSubmitSpy = jest.spyOn(pageMethods, 'onSubmit')
  const onDeleteSpy = jest.spyOn(pageMethods, 'onDelete')
  const onRestoreSpy = jest.spyOn(pageMethods, 'onRestore')

  beforeEach(() => {
    appCookie.up()
    observer.reset()
  })

  afterAll(() => {
    onSubmitSpy.mockRestore()
    onDeleteSpy.mockRestore()
    onRestoreSpy.mockRestore()
  })

  /** tests */
  it('render page components', async () => {
    props.item.id = 0
    const rendModeNew = await renderUI(<FinanceOriginIdPage {...props} />)

    expect(screen.queryByRole('heading', { name: /Criar origem/i })).toBeInTheDocument()

    rendModeNew.unmount()

    props.item.id = 1
    const rendModeEdit = await renderUI(<FinanceOriginIdPage {...props} />)

    expect(screen.queryByRole('heading', { name: /Editar origem/i })).toBeInTheDocument()

    rendModeEdit.unmount()
  })

  it('change inputs and submit form', async () => {
    const onSubmitCalled = jest.fn()

    onSubmitSpy.mockImplementation(onSubmitCalled)

    props.item.id = 0
    const { container } = await renderUI(<FinanceOriginIdPage {...props} />)

    await waitFor(() => {
      fireEvent.change(screen.queryByTestId('input-description') as HTMLInputElement, {
        target: { value: 'Carteira Teste' }
      })
      fireEvent.change(screen.queryByTestId('input-typeId') as HTMLSelectElement, {
        target: { value: '1' }
      })
      fireEvent.change(screen.queryByTestId('input-parentId') as HTMLSelectElement, {
        target: { value: '0' }
      })
      fireEvent.change(screen.queryByTestId('input-walletId') as HTMLSelectElement, {
        target: { value: '1' }
      })
    })

    await act(() => {
      (screen.queryByTestId('button-submit') as HTMLButtonElement).click()
    })

    expect(onSubmitCalled).toBeCalledTimes(1)

    expect(container).toMatchSnapshot()

    await act(() => {
      observerKey.publish('feedbackForm', {
        message: 'Origem atualizada com sucesso',
        type: 'success'
      })
    })

    expect(screen.queryByText('Origem atualizada com sucesso')).toBeInTheDocument()

    await act(() => {
      (screen.queryByTestId('feedback-reset') as HTMLButtonElement).click()
    })

    expect(!!screen.queryByText('Origem atualizada com sucesso')).toBeFalsy()
  })

  it('click actions button in form', async () => {
    const redirectCalled = jest.fn()

    await observer.subscribe(redirectObserver(redirectCalled))

    props.item.description = 'Origem Test'
    await renderUI(<FinanceOriginIdPage {...props} />)

    let inputDescriptionCurrentValue

    inputDescriptionCurrentValue = (screen.queryByTestId('input-description') as HTMLInputElement).value
    expect(inputDescriptionCurrentValue).toBe('Origem Test')

    await waitFor(() => {
      fireEvent.change(screen.queryByTestId('input-description') as HTMLInputElement, {
        target: { value: 'test origem' }
      })
    })

    inputDescriptionCurrentValue = (screen.queryByTestId('input-description') as HTMLInputElement).value
    expect(inputDescriptionCurrentValue).toBe('test origem')


    /** button-reset */
    await act(() => {
      (screen.queryByTestId('button-reset') as HTMLButtonElement).click()
    })

    inputDescriptionCurrentValue = (screen.queryByTestId('input-description') as HTMLInputElement).value
    expect(inputDescriptionCurrentValue).toBe('Origem Test')


    /** button-clean */
    await act(() => {
      (screen.queryByTestId('button-clean') as HTMLButtonElement).click()
    })

    inputDescriptionCurrentValue = (screen.queryByTestId('input-description') as HTMLInputElement).value
    expect(inputDescriptionCurrentValue).toBe('')


    /** button-back */
    await act(() => {
      (screen.queryByTestId('button-back') as HTMLButtonElement).click()
    })
    expect(redirectCalled).toBeCalledTimes(1)
  })

  it('click actions button onDelete', async () => {
    const onDeleteCalled = jest.fn()

    onDeleteSpy.mockImplementation(onDeleteCalled)

    props.item.trashed = 0
    await renderUI(<FinanceOriginIdPage {...props} />)

    jest.spyOn(global.window, 'confirm').mockImplementationOnce(() => true);

    await act(() => {
      (screen.queryByTestId('button-delete') as HTMLButtonElement).click()
    })
    expect(onDeleteCalled).toBeCalledTimes(1)
  })

  it('click actions button onRestore', async () => {
    const onRestoreCalled = jest.fn()

    onRestoreSpy.mockImplementation(onRestoreCalled)

    props.item.trashed = 1
    await renderUI(<FinanceOriginIdPage {...props} />)

    jest.spyOn(global.window, 'alert').mockImplementationOnce(() => true);

    await act(() => {
      (screen.queryByTestId('button-restore') as HTMLButtonElement).click()
    })
    expect(onRestoreCalled).toBeCalledTimes(1)
  })
})

describe('src/@core/presentation/views/finance.origin/FinanceOrigintListPage.methods', () => {
  const feedbackFormCalled = jest.fn()
  const loadingCalled = jest.fn()
  const redirectCalled = jest.fn()

  /** spy */
  const spyFinanceOriginGatewayV1 = jest.spyOn(require('@/@core/infra/geteway'), 'financeOriginGatewayV1')

  beforeEach(() => {
    appCookie.up()
    observerKey.reset()
    observer.reset()

    feedbackFormCalled.mockReset()
    loadingCalled.mockReset()
    redirectCalled.mockReset()
  })
  afterAll(() => {
    spyFinanceOriginGatewayV1.mockRestore()
  })

  it('pageMethods onSubmit', async () => {
    await observerKey.subscribe('feedbackForm', feedbackFormCalled)
    await observer.subscribe(loadingObserver(loadingCalled))

    /** request success POST */
    spyFinanceOriginGatewayV1.mockReturnValueOnce({
      get: jest.fn().mockResolvedValue({
        data: []
      }),
      post: jest.fn().mockResolvedValue({
        data: { message: 'carteira criaca' }
      })
    })

    itemOriginMock1.id = 0
    await pageMethods.onSubmit(itemOriginMock1)

    expect(feedbackFormCalled).toBeCalledTimes(1)
    expect(loadingCalled).toBeCalledTimes(2)
    
    /** request success PUT */
    spyFinanceOriginGatewayV1.mockReturnValueOnce({
      get: jest.fn().mockResolvedValue({
        data: []
      }),
      put: jest.fn().mockResolvedValue({
        data: { message: 'carteira atualizada' }
      })
    })

    itemOriginMock1.id = 1
    await pageMethods.onSubmit(itemOriginMock1)

    expect(feedbackFormCalled).toBeCalledTimes(2)
    expect(loadingCalled).toBeCalledTimes(4)

    /** request error */
    spyFinanceOriginGatewayV1.mockReturnValueOnce({
      put: jest.fn().mockRejectedValue({
        message: 'Erro 500'
      })
    })

    itemOriginMock1.id = 1
    await pageMethods.onSubmit(itemOriginMock1)

    expect(feedbackFormCalled).toBeCalledTimes(3)
    expect(loadingCalled).toBeCalledTimes(6)
  })

  it('pageMethods onDelete', async () => {
    await observerKey.subscribe('feedbackForm', feedbackFormCalled)
    await observer.subscribe(loadingObserver(loadingCalled))
    await observer.subscribe(redirectObserver(redirectCalled))

    /** request success */
    spyFinanceOriginGatewayV1.mockReturnValueOnce({
      remove: jest.fn().mockResolvedValue({
        data: { message: 'carteira excluida' }
      })
    })

    await pageMethods.onDelete(1)

    expect(feedbackFormCalled).toBeCalledTimes(1)

    expect(redirectCalled).toBeCalledTimes(1)

    expect(loadingCalled).toBeCalledTimes(2)

    /** request error */
    spyFinanceOriginGatewayV1.mockReturnValueOnce({
      remove: jest.fn().mockRejectedValue({
        message: 'Erro 500'
      })
    })

    await pageMethods.onDelete(1)

    expect(feedbackFormCalled).toBeCalledTimes(2)

    expect(loadingCalled).toBeCalledTimes(4)
  })

  it('pageMethods onRestore', async () => {
    await observerKey.subscribe('feedbackForm', feedbackFormCalled)
    await observer.subscribe(loadingObserver(loadingCalled))

    /** request success */
    spyFinanceOriginGatewayV1.mockReturnValueOnce({
      restore: jest.fn().mockResolvedValue({
        data: { message: 'carteira excluida' }
      })
    })

    await pageMethods.onRestore(1)

    expect(feedbackFormCalled).toBeCalledTimes(1)
    expect(loadingCalled).toBeCalledTimes(2)

    /** request error */
    spyFinanceOriginGatewayV1.mockReturnValueOnce({
      restore: jest.fn().mockRejectedValue({
        message: 'Erro 500'
      })
    })

    await pageMethods.onRestore(1)

    expect(feedbackFormCalled).toBeCalledTimes(2)
    expect(loadingCalled).toBeCalledTimes(4)
  })

  it('pageMethods updateStore', async () => {
    const financeOriginCalled = jest.fn()

    await observer.subscribe(financeOriginObserver(financeOriginCalled))

    /** request success */
    spyFinanceOriginGatewayV1.mockReturnValueOnce({
      get: jest.fn().mockResolvedValue({
        data: []
      })
    })

    await pageMethods.updateStore()

    expect(financeOriginCalled).toBeCalledTimes(1)
  })
})
