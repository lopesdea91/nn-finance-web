import { fireEvent, waitFor } from "@testing-library/react"
import { renderUI, screen, act, itemTagMock1 } from "@/@core/__tests__"
import { appCookie } from "@/@core/infra/memory"
import { financeTagObserver, loadingObserver, observer, redirectObserver } from "@/@core/domain/observer"
import { observerKey } from "@/@core/domain/observerKey"
import { FinanceTagIdPage } from "./FinanceTagIdPage"
import { PageProps } from "./FinanceTagIdPage.type"
import { pageMethods } from "./FinanceTagIdPage.methods"

jest.mock('@/@core/infra/geteway', () => ({
  ...jest.requireActual('@/@core/infra/geteway')
}))
jest.mock('@/@core/infra/http', () => ({
  ...jest.requireActual('@/@core/infra/http')
}))

describe('src/@core/presentation/views/finance.tag/FinanceTagIdtPage', () => {
  const props: PageProps = {
    item: itemTagMock1
  }

  /** spy */
  const onSubmitSpy = jest.spyOn(pageMethods, 'onSubmit')
  const onDeleteSpy = jest.spyOn(pageMethods, 'onDelete')
  const onRestoreSpy = jest.spyOn(pageMethods, 'onRestore')

  beforeEach(() => {
    appCookie.init()
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
    const rendModeNew = await renderUI(<FinanceTagIdPage {...props} />)

    expect(screen.queryByRole('heading', { name: /Criar tag/i })).toBeInTheDocument()
    
    rendModeNew.unmount()

    props.item.id = 1
    const rendModeEdit = await renderUI(<FinanceTagIdPage {...props} />)

    expect(screen.queryByRole('heading', { name: /Editar tag/i })).toBeInTheDocument()

    rendModeEdit.unmount()
  })

  it('change inputs and submit form', async () => {
    const onSubmitCalled = jest.fn()

    onSubmitSpy.mockImplementation(onSubmitCalled)

    props.item.id = 0
    await renderUI(<FinanceTagIdPage {...props} />)

    await waitFor(() => {
      fireEvent.change(screen.queryByTestId('input-description') as HTMLInputElement, {
        target: { value: 'tag Teste' }
      })
      fireEvent.change(screen.queryByTestId('input-typeId') as HTMLSelectElement, {
        target: { value: '1' }
      })
      fireEvent.change(screen.queryByTestId('input-walletId') as HTMLSelectElement, {
        target: { value: '1' }
      })
    })

    await act(() => {
      (screen.queryByTestId('button-submit') as HTMLButtonElement).click()
    })

    expect(onSubmitCalled).toBeCalledTimes(1)

    await act(() => {
      observerKey.publish('feedbackForm', {
        message: 'Tag atualizada com sucesso',
        type: 'success'
      })
    })

    expect(screen.queryByText('Tag atualizada com sucesso')).toBeInTheDocument()

    await act(() => {
      (screen.queryByTestId('feedback-reset') as HTMLButtonElement).click()
    })

    expect(!!screen.queryByText('Tag atualizada com sucesso')).toBeFalsy()
  })

  it('click actions button in form', async () => {
    const redirectCalled = jest.fn()

    await observer.subscribe(redirectObserver(redirectCalled))

    props.item.description = 'Tag Test'
    await renderUI(<FinanceTagIdPage {...props} />)

    let inputDescriptionCurrentValue

    inputDescriptionCurrentValue = (screen.queryByTestId('input-description') as HTMLInputElement).value
    expect(inputDescriptionCurrentValue).toBe('Tag Test')

    await waitFor(() => {
      fireEvent.change(screen.queryByTestId('input-description') as HTMLInputElement, {
        target: { value: 'test tag' }
      })
    })

    inputDescriptionCurrentValue = (screen.queryByTestId('input-description') as HTMLInputElement).value
    expect(inputDescriptionCurrentValue).toBe('test tag')


    /** button-reset */
    await act(() => {
      (screen.queryByTestId('button-reset') as HTMLButtonElement).click()
    })

    inputDescriptionCurrentValue = (screen.queryByTestId('input-description') as HTMLInputElement).value
    expect(inputDescriptionCurrentValue).toBe('Tag Test')


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
    await renderUI(<FinanceTagIdPage {...props} />)

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
    await renderUI(<FinanceTagIdPage {...props} />)

    jest.spyOn(global.window, 'alert').mockImplementationOnce(() => true);

    await act(() => {
      (screen.queryByTestId('button-restore') as HTMLButtonElement).click()
    })
    expect(onRestoreCalled).toBeCalledTimes(1)
  })
})

describe('src/@core/presentation/views/finance.tag/FinanceTagIdtPage.methods', () => {
  const feedbackFormCalled = jest.fn()
  const loadingCalled = jest.fn()
  const redirectCalled = jest.fn()

  /** spy */
  const spyFinanceTagGatewayV1 = jest.spyOn(require('@/@core/infra/geteway'), 'financeTagGatewayV1')

  beforeEach(() => {
    appCookie.init()
    observerKey.reset()
    observer.reset()

    feedbackFormCalled.mockReset()
    loadingCalled.mockReset()
    redirectCalled.mockReset()
  })
  afterAll(() => {
    spyFinanceTagGatewayV1.mockRestore()
  })

  it('pageMethods onSubmit', async () => {
    await observerKey.subscribe('feedbackForm', feedbackFormCalled)
    await observer.subscribe(loadingObserver(loadingCalled))

    /** request success POST */
    spyFinanceTagGatewayV1.mockReturnValueOnce({
      get: jest.fn().mockResolvedValue({
        data: []
      }),
      post: jest.fn().mockResolvedValue({
        data: { message: 'tag criaca' }
      })
    })

    itemTagMock1.id = 0
    await pageMethods.onSubmit(itemTagMock1)

    expect(feedbackFormCalled).toBeCalledTimes(1)
    expect(loadingCalled).toBeCalledTimes(2)
    
    /** request success PUT */
    spyFinanceTagGatewayV1.mockReturnValueOnce({
      get: jest.fn().mockResolvedValue({
        data: []
      }),
      put: jest.fn().mockResolvedValue({
        data: { message: 'tag atualizada' }
      })
    })

    itemTagMock1.id = 1
    await pageMethods.onSubmit(itemTagMock1)

    expect(feedbackFormCalled).toBeCalledTimes(2)
    expect(loadingCalled).toBeCalledTimes(4)

    /** request error */
    spyFinanceTagGatewayV1.mockReturnValueOnce({
      put: jest.fn().mockRejectedValue({
        message: 'Erro 500'
      })
    })

    itemTagMock1.id = 1
    await pageMethods.onSubmit(itemTagMock1)

    expect(feedbackFormCalled).toBeCalledTimes(3)
    expect(loadingCalled).toBeCalledTimes(6)
  })

  it('pageMethods onDelete', async () => {
    await observerKey.subscribe('feedbackForm', feedbackFormCalled)
    await observer.subscribe(loadingObserver(loadingCalled))
    await observer.subscribe(redirectObserver(redirectCalled))

    /** request success */
    spyFinanceTagGatewayV1.mockReturnValueOnce({
      remove: jest.fn().mockResolvedValue({
        data: { message: 'tag excluida' }
      })
    })

    await pageMethods.onDelete(1)

    expect(feedbackFormCalled).toBeCalledTimes(1)

    expect(redirectCalled).toBeCalledTimes(1)

    expect(loadingCalled).toBeCalledTimes(2)

    /** request error */
    spyFinanceTagGatewayV1.mockReturnValueOnce({
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
    spyFinanceTagGatewayV1.mockReturnValueOnce({
      restore: jest.fn().mockResolvedValue({
        data: { message: 'tag excluida' }
      })
    })

    await pageMethods.onRestore(1)

    expect(feedbackFormCalled).toBeCalledTimes(1)
    expect(loadingCalled).toBeCalledTimes(2)

    /** request error */
    spyFinanceTagGatewayV1.mockReturnValueOnce({
      restore: jest.fn().mockRejectedValue({
        message: 'Erro 500'
      })
    })

    await pageMethods.onRestore(1)

    expect(feedbackFormCalled).toBeCalledTimes(2)
    expect(loadingCalled).toBeCalledTimes(4)
  })

  it('pageMethods updateStore', async () => {
    const financeTagCalled = jest.fn()

    await observer.subscribe(financeTagObserver(financeTagCalled))

    /** request success */
    spyFinanceTagGatewayV1.mockReturnValueOnce({
      get: jest.fn().mockResolvedValue({
        data: []
      })
    })

    await pageMethods.updateStore()

    expect(financeTagCalled).toBeCalledTimes(1)
  })



})
