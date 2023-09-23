import { fireEvent, waitFor } from "@testing-library/react"
import { renderUI, screen, act, itemTagMock1 } from "@/@core/__tests__"
import { appCookie, financeTagCookie } from "@/@core/infra/memory"
import { observer, redirectObserver } from "@/@core/domain/observer"
import { observerKey } from "@/@core/domain/observerKey"
import { FinanceTagListPage } from "./FinanceTagListPage"
import { PageProps } from "./FinanceTagListPage.type"
import { pageMethods } from "./FinanceTagListPage.methods"


jest.mock('@/@core/infra/geteway', () => ({
  ...jest.requireActual('@/@core/infra/geteway')
}))
jest.mock('@/@core/infra/http', () => ({
  ...jest.requireActual('@/@core/infra/http')
}))

describe('src/@core/presentation/views/finance.tag/FinanceTagListPage', () => {
  const props: PageProps = {
    items: []
  }

  /** spy */
  const getItemsSpy = jest.spyOn(pageMethods, 'getItems')

  beforeEach(() => {
    appCookie.up()
    observer.reset()
  })
  afterAll(() => {
    getItemsSpy.mockRestore()
  })

  /** tests */
  it('render page components', async () => {
    await renderUI(<FinanceTagListPage {...props} />)

    expect(screen.queryByRole('heading', { name: /Tags/i })).toBeInTheDocument()
  })

  it('change inputs and submit form search', async () => {
    const getItemsCalled = jest.fn()

    getItemsSpy.mockImplementation(getItemsCalled)

    await renderUI(<FinanceTagListPage {...props} />)

    await waitFor(() => {
      fireEvent.change(screen.queryByTestId('input-query') as HTMLInputElement, {
        target: { value: 'Teste' }
      })
      fireEvent.change(screen.queryByTestId('input-typeId') as HTMLSelectElement, {
        target: { value: '2' }
      })
      fireEvent.change(screen.queryByTestId('input-walletId') as HTMLSelectElement, {
        target: { value: '1' }
      })
    })

    await act(() => {
      (screen.queryByTestId('button-search') as HTMLButtonElement).click()
    })

    const currentCookie = financeTagCookie.get()

    expect(currentCookie.query).toBe('Teste')
    expect(currentCookie.typeId).toBe('2')
    expect(currentCookie.walletId).toBe('1')
    expect(getItemsCalled).toBeCalledTimes(1)
  })

  it('click actions button in form search', async () => {
    financeTagCookie.reset()

    const redirectCalled = jest.fn()
    await observer.subscribe(redirectObserver(redirectCalled))

    const getItemsCalled = jest.fn()
    getItemsSpy.mockImplementation(getItemsCalled)

    await renderUI(<FinanceTagListPage {...props} />)

    const elButtonReset = screen.queryByTestId('button-reset') as HTMLButtonElement
    const elButtonTrashed = screen.queryByTestId('button-trashed') as HTMLButtonElement
    const elButtonAdd = screen.queryByTestId('button-add') as HTMLButtonElement

    financeTagCookie.set({ query: 'Test' })

    expect(financeTagCookie.get().query).toEqual('Test')

    /** button-reset */
    await act(() => {
      elButtonReset.click()
    })
    expect(getItemsCalled).toBeCalledTimes(1)

    expect(financeTagCookie.get().query).toEqual('')

    expect(!!financeTagCookie.get()?.deleted).toBeFalsy()

    /** button-trashed -> 1 */
    await act(() => {
      elButtonTrashed.click()
    })
    expect(getItemsCalled).toBeCalledTimes(2)

    expect(!!financeTagCookie.get()?.deleted).toBeTruthy()

    /** button-trashed -> 2 */
    await act(() => {
      elButtonTrashed.click()
    })
    expect(getItemsCalled).toBeCalledTimes(3)

    await act(async () => {
      await elButtonAdd.click()
    })
    expect(redirectCalled).toBeCalledTimes(1)
  })

  it('publish items to table', async () => {
    const redirectCalled = jest.fn()
    await observer.subscribe(redirectObserver(redirectCalled))

    props.items.push(itemTagMock1)

    await renderUI(<FinanceTagListPage {...props} />)

    const elButtonEdit = screen.queryByTestId('row-1') as HTMLButtonElement

    await act(() => {
      elButtonEdit.click()
    })

    expect(redirectCalled).toBeCalledTimes(1)
  })
})

describe('src/@core/presentation/views/finance.tag/FinanceTagListPage.methods', () => {
  const tableWalletCalled = jest.fn()
  const redirectCalled = jest.fn()

  /** spy */
  const spyFinanceTagGatewayV1 = jest.spyOn(require('@/@core/infra/geteway'), 'financeTagGatewayV1')

  beforeEach(() => {
    appCookie.up()
    observerKey.reset()
    observer.reset()
  })
  afterAll(() => {
    spyFinanceTagGatewayV1.mockRestore()
  })


  /** tests */
  it('execut getItems', async () => {
    await observerKey.subscribe('tableTag', tableWalletCalled)
    await observer.subscribe(redirectObserver(redirectCalled))

    /** request success */
    spyFinanceTagGatewayV1.mockReturnValueOnce({
      page: jest.fn().mockResolvedValue({
        data: { items: [] }
      })
    })

    await pageMethods.getItems()

    expect(tableWalletCalled).toBeCalledTimes(1)

    /** request error */
    spyFinanceTagGatewayV1.mockReturnValueOnce({
      page: jest.fn().mockRejectedValue({
        message: 'Erro 500'
      })
    })

    await pageMethods.getItems({})

    expect(redirectCalled).toBeCalledTimes(1)
  })
})