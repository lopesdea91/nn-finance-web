import { renderWithRedux } from "@/__tests__/utils/render"
import { act, fireEvent, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { FormSearch } from "./FormSearch"
import { FinanceWalletFormSearchFields } from '@/types/form/settingsFinanceWallet'

describe('src/@core/presentation/settings.finance.wallet/components', () => {
  const getItemsMock = jest.fn()
  const onChangeSearchMock = jest.fn()
  const resetSearchMock = jest.fn()

  const props = {
    getItems: getItemsMock,
    search: {
      _q: '',
      _limit: 15,
      page: 0,
      enable: 1,
      panel: 0,
    } as FinanceWalletFormSearchFields,
    onChangeSearch: onChangeSearchMock,
    resetSearch: resetSearchMock,
  }

  test('Render component FormSearch', async () => {
    renderWithRedux(<FormSearch {...props} />)

    /** change Input Query */
    const elInputQuery = await screen.findByTestId('app-input')

    fireEvent.change(elInputQuery, { target: { value: "123" } })

    expect(onChangeSearchMock).toBeCalledTimes(1)
  })

  test('click buttons submit and reset component FormSearch', async () => {
    renderWithRedux(<FormSearch {...props} />)

    /** click button submit form */
    const elButtonSubmit = await screen.findByTestId('button-submit')

    await act(async () => {
      fireEvent.click(elButtonSubmit)
    })

    expect(getItemsMock).toBeCalledTimes(1)

    /** click button reset form */
    const elButtonReset = await screen.findByTestId('button-reset')

    await act(async () => {
      fireEvent.click(elButtonReset);
    })

    expect(resetSearchMock).toBeCalledTimes(1)
  })
})