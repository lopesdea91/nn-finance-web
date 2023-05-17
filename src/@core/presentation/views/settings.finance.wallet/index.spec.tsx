import { renderWithRedux } from "@/__tests__/utils/render"
import { act, fireEvent, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { SettingsFinanceWalletPage, PageProps } from "."

let props: PageProps = {
  data: {
    items: [],
    lastPage: 1,
    limit: 15,
    page: 1,
    total: 1
  },
  search: {},
  searchKey: '',
  unauthenticated: false,
}

const spyUseRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('src/@core/presentation/settings.finance.wallet/index.spec.tsx', () => {
  test('Render component', () => {
    spyUseRouter.mockImplementation(() => ({
      push: jest.fn()
    }))

    const { container } = renderWithRedux(<SettingsFinanceWalletPage {...props} />)

    expect(container.innerHTML).toMatch(/Carteiras/)

    // expect(rend).toMatchSnapshot()
  })

  test('change fields', async () => {
    spyUseRouter.mockImplementation(() => ({
      push: jest.fn()
    }))

    renderWithRedux(<SettingsFinanceWalletPage {...props} />)


    /** change Select Status */
    // const { findAllByLabelText, findByLabelText, findByRole, container, findByTestId } = rend

    // const elPage = await screen.findByTestId('page')

    // const elSelectStatus = await screen.findByLabelText('Status') as HTMLDivElement
    // const elSelectStatusInput = elSelectStatus.querySelector('input') as HTMLInputElement

    // userEvent.click(elSelectStatus);

    // const listbox = await screen.findByRole('listbox', {
    //   name: 'Status'
    // })

    // userEvent.click(await within(listbox).findByText('Ativo'));

    /** change Select Panel */

    /** change Input Query */
    const elInputQuery = await screen.findByTestId('app-input')

    fireEvent.change(elInputQuery, { target: { value: "123" } })

    /** click button reset form */
    const elButtonReset = await screen.findByTestId('button-reset')

    userEvent.click(elButtonReset);

    fireEvent.change(elInputQuery, { target: { value: "" } })
  })
  test('click buttons submit and reset', async () => {
    spyUseRouter.mockImplementation(() => ({
      push: jest.fn()
    }))

    jest.spyOn(require('axios'), 'get').mockResolvedValue({
      status: 200,
      data: {
        items: [],
        limit: 15,
        total: 7,
        lastPage: 1,
        page: 1,
      }
    })

    const { container } = renderWithRedux(<SettingsFinanceWalletPage {...props} />)

    const elButtonSubmit = await screen.findByTestId('button-submit')

    await act(async () => {
      fireEvent.click(elButtonSubmit)
    })

    expect(container.innerHTML).toMatch(/1–7 of 7/i)

    userEvent.click(elButtonSubmit);
  })
})