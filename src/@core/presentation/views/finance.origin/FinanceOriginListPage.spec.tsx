import { RenderResult, fireEvent, waitFor } from "@testing-library/react"
import { renderUI, screen, act, itemOriginMock1, itemOriginTypeMock1, itemOriginTypeMock2, itemStatusMock1, itemStatusMock2, itemTagMock1, itemTypeMock1, itemTypeMock2, itemWalletMock1, observerMock } from "@/@core/__tests__"
import { appCookie, financeOriginCookie } from "@/@core/infra/memory"
import { financeOriginObserver, financeOriginTypeObserver, financeStatusObserver, financeTagObserver, financeTypeObserver, financeWalletObserver, observer, redirectObserver } from "@/@core/domain/observer"
import { IFinanceOrigin } from "@/@core/domain/entities/finance-origin"
import { observerKey } from "@/@core/domain/observerKey"
import { FinanceOriginListPage } from "./FinanceOriginListPage"
import { PageProps } from "./FinanceOriginListPage.type"
import { pageMethods } from "./FinanceOriginListPage.methods"
import { useFinanceOriginListStore, useFinanceOriginTypeListStore, useFinanceWalletListStore } from "@/@core/framework/store"
import React from "react"


jest.mock('@/@core/infra/geteway', () => ({
  ...jest.requireActual('@/@core/infra/geteway')
}))
jest.mock('@/@core/infra/http', () => ({
  ...jest.requireActual('@/@core/infra/http')
}))

describe('src/@core/presentation/views/finance.origin/FinanceOriginListPage', () => {
  const props: PageProps = {
    items: []
  }

  /** spy */
  const getItemsSpy = jest.spyOn(pageMethods, 'getItems')

  beforeEach(() => {
    appCookie.up()
  })
  beforeAll(() => {
  })
  afterAll(() => {
    getItemsSpy.mockRestore()
  })

  /** tests */
  it('render page components', async () => {
    const rend = await renderUI(<FinanceOriginListPage {...props} />)

    expect(screen.queryByText('Origens')).toBeInTheDocument()
  })

  it('change inputs and submit form search', async () => {
    const getItemsCalled = jest.fn()

    getItemsSpy.mockImplementation(getItemsCalled)

    await renderUI(<FinanceOriginListPage {...props} />)

    await waitFor(() => {
      fireEvent.change(screen.queryByTestId('input-query') as HTMLInputElement, {
        target: { value: 'Teste' }
      })
      fireEvent.change(screen.queryByTestId('input-typeId') as HTMLSelectElement, {
        target: { value: '2' }
      })
      fireEvent.change(screen.queryByTestId('input-parentId') as HTMLSelectElement, {
        target: { value: '1' }
      })
      fireEvent.change(screen.queryByTestId('input-walletId') as HTMLSelectElement, {
        target: { value: '1' }
      })
    })

    await act(() => {
      (screen.queryByTestId('button-search') as HTMLButtonElement).click()
    })

    const currentCookie = financeOriginCookie.get()

    expect(currentCookie.query).toBe('Teste')
    expect(currentCookie.typeId).toBe('2')
    expect(currentCookie.parentId).toBe('1')
    expect(currentCookie.walletId).toBe('1')
    expect(getItemsCalled).toBeCalledTimes(1)
  })

  it('click actions button in form search', async () => {
    financeOriginCookie.reset()

    const redirectCalled = jest.fn()
    let redirectDown = await observer.subscribe(redirectObserver(redirectCalled))

    const getItemsCalled = jest.fn()
    getItemsSpy.mockImplementation(getItemsCalled)

    await renderUI(<FinanceOriginListPage {...props} />)

    const elButtonReset = screen.queryByTestId('button-reset') as HTMLButtonElement
    const elButtonTrashed = screen.queryByTestId('button-trashed') as HTMLButtonElement
    const elButtonAdd = screen.queryByTestId('button-add') as HTMLButtonElement

    financeOriginCookie.set({ query: 'Test' })

    expect(financeOriginCookie.get().query).toEqual('Test')

    /** button-reset */
    await act(() => {
      elButtonReset.click()
    })
    expect(getItemsCalled).toBeCalledTimes(1)

    expect(financeOriginCookie.get().query).toEqual('')

    expect(!!financeOriginCookie.get()?.deleted).toBeFalsy()

    /** button-trashed -> 1 */
    await act(() => {
      elButtonTrashed.click()
    })
    expect(getItemsCalled).toBeCalledTimes(2)

    expect(!!financeOriginCookie.get()?.deleted).toBeTruthy()

    /** button-trashed -> 2 */
    await act(() => {
      elButtonTrashed.click()
    })
    expect(getItemsCalled).toBeCalledTimes(3)

    await act(async () => {
      await elButtonAdd.click()
    })
    expect(redirectCalled).toBeCalledTimes(1)

    redirectDown()
  })

  it('publish items to table', async () => {

    const redirectCalled = jest.fn()
    let redirectDown = await observer.subscribe(redirectObserver(redirectCalled))

    props.items.push(itemOriginMock1)

    await renderUI(<FinanceOriginListPage {...props} />)

    const elButtonEdit = screen.queryByTestId('row-1') as HTMLButtonElement

    await act(() => {
      elButtonEdit.click()
    })

    expect(redirectCalled).toBeCalledTimes(1)

    redirectDown()
  })
})

describe('src/@core/presentation/views/finance.origin/FinanceOriginListPage.methods', () => {
  const tableWalletCalled = jest.fn()
  const redirectCalled = jest.fn()

  /** spy */
  const spyFinanceOriginGatewayV1 = jest.spyOn(require('@/@core/infra/geteway'), 'financeOriginGatewayV1')

  beforeEach(() => {
    appCookie.up()
    observerKey.reset()
    observer.reset()
  })
  afterAll(() => {
    spyFinanceOriginGatewayV1.mockRestore()
  })

  /** tests */
  it('execut getItems', async () => {
    await observerKey.subscribe('tableOrigin', tableWalletCalled)
    await observer.subscribe(redirectObserver(redirectCalled))

    /** request success */
    spyFinanceOriginGatewayV1.mockReturnValueOnce({
      page: jest.fn().mockResolvedValue({
        data: { items: [] }
      })
    })

    await pageMethods.getItems()

    expect(tableWalletCalled).toBeCalledTimes(1)

    /** request error */
    spyFinanceOriginGatewayV1.mockReturnValueOnce({
      page: jest.fn().mockRejectedValue({
        message: 'Erro 500'
      })
    })

    await pageMethods.getItems({})

    expect(redirectCalled).toBeCalledTimes(1)
  })
})