import { fireEvent, waitFor } from "@testing-library/react"
import { renderUI, screen, act, itemWalletMock1 } from "@/@core/__tests__"
import { appCookie, financeWalletCookie } from "@/@core/infra/memory"
import { observer, redirectObserver } from "@/@core/domain/observer"
import { observerKey } from "@/@core/domain/observerKey"
import { FinanceWalletListPage } from "./FinanceWalletListPage"
import { PageProps } from "./FinanceWalletListPage.type"
import { pageMethods } from "./FinanceWalletListPage.methods"

jest.mock('@/@core/infra/geteway', () => ({
  ...jest.requireActual('@/@core/infra/geteway')
}))
jest.mock('@/@core/infra/http', () => ({
  ...jest.requireActual('@/@core/infra/http')
}))

describe('src/@core/presentation/views/finance.wallet/FinanceWalletListPage', () => {
  const props: PageProps = {
    items: []
  }

  /** spy */
  const getItemsSpy = jest.spyOn(pageMethods, 'getItems')

  beforeEach(() => {
    appCookie.init()
    observer.reset()
  })
  afterAll(() => {
    getItemsSpy.mockRestore()
  })

  /** tests */
  it('render page components', async () => {
    await renderUI(<FinanceWalletListPage {...props} />)

    expect(screen.queryByRole('heading', { name: /Carteiras/i })).toBeInTheDocument()
  })

  it('change inputs and submit form search', async () => {
    const getItemsCalled = jest.fn()

    getItemsSpy.mockImplementation(getItemsCalled)

    await renderUI(<FinanceWalletListPage {...props} />)

    await waitFor(() => {
      fireEvent.change(screen.queryByTestId('input-query') as HTMLInputElement, {
        target: { value: 'Teste' }
      })
      fireEvent.change(screen.queryByTestId('input-panel') as HTMLSelectElement, {
        target: { value: '1' }
      })
    })

    await act(() => {
      (screen.queryByTestId('button-search') as HTMLButtonElement).click()
    })

    const currentCookie = financeWalletCookie.get()

    expect(currentCookie.query).toBe('Teste')
    expect(currentCookie.panel).toBe('1')
    expect(getItemsCalled).toBeCalledTimes(1)
  })

  it('click actions button in form search', async () => {
    financeWalletCookie.reset()

    const redirectCalled = jest.fn()
    await observer.subscribe(redirectObserver(redirectCalled))

    const getItemsCalled = jest.fn()
    getItemsSpy.mockImplementation(getItemsCalled)

    await renderUI(<FinanceWalletListPage {...props} />)

    const elButtonReset = screen.queryByTestId('button-reset') as HTMLButtonElement
    const elButtonTrashed = screen.queryByTestId('button-trashed') as HTMLButtonElement
    const elButtonAdd = screen.queryByTestId('button-add') as HTMLButtonElement

    financeWalletCookie.set({ query: 'Test' })

    expect(financeWalletCookie.get().query).toEqual('Test')

    /** button-reset */
    await act(() => {
      elButtonReset.click()
    })
    expect(getItemsCalled).toBeCalledTimes(1)

    expect(financeWalletCookie.get().query).toEqual('')

    expect(!!financeWalletCookie.get()?.deleted).toBeFalsy()

    /** button-trashed -> 1 */
    await act(() => {
      elButtonTrashed.click()
    })
    expect(getItemsCalled).toBeCalledTimes(2)

    expect(!!financeWalletCookie.get()?.deleted).toBeTruthy()

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

    props.items.push(itemWalletMock1)

    await renderUI(<FinanceWalletListPage {...props} />)

    const elButtonEdit = screen.queryByTestId('row-1') as HTMLButtonElement
    const textDescription = screen.queryByText('wallet 1')

    expect(textDescription).toBeTruthy()

    await act(() => {
      elButtonEdit.click()
    })

    expect(redirectCalled).toBeCalledTimes(1)
  })
})

describe('src/@core/presentation/views/finance.wallet/FinanceWalletListPage.methods', () => {
  const tableWalletCalled = jest.fn()
  const redirectCalled = jest.fn()

  /** spy */
  const spyFinanceWalletGatewayV1 = jest.spyOn(require('@/@core/infra/geteway'), 'financeWalletGatewayV1')

  beforeEach(() => {
    appCookie.init()
    observerKey.reset()
    observer.reset()
  })
  afterAll(() => {
    spyFinanceWalletGatewayV1.mockRestore()
  })

  /** tests */
  it('execut getItems', async () => {
    await observerKey.subscribe('tableWallet', tableWalletCalled)
    await observer.subscribe(redirectObserver(redirectCalled))

    /** request success */
    spyFinanceWalletGatewayV1.mockReturnValueOnce({
      page: jest.fn().mockResolvedValue({
        data: { items: [] }
      })
    })
    await pageMethods.getItems()

    expect(tableWalletCalled).toBeCalledTimes(1)

    /** request error */
    spyFinanceWalletGatewayV1.mockReturnValueOnce({
      page: jest.fn().mockRejectedValue({
        message: 'Erro 500'
      })
    })
    await pageMethods.getItems({})

    expect(redirectCalled).toBeCalledTimes(1)
  })
})
