import { renderWithRedux } from "@/__tests__/utils/render"
import { NotFoundPage } from "."


describe('src/template/404/index.tsx', () => {
  it('Render component', async () => {
    const { findByText } = renderWithRedux(<NotFoundPage />)

    expect(await findByText('404 - Page Not Found')).toBeInTheDocument()
  })
})