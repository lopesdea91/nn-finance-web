import { act, screen } from '@testing-library/react'
import { useState } from 'react'
import { AppTab } from './AppTab'
import { AppTabs } from './AppTabs'
import { AppTabPanel } from './AppTabPanel'
import { renderWithRedux } from '@/__tests__/utils/render'

const ComponentTest = () => {
  const [value, setValue] = useState(0)

  return (
    <>
      <AppTabs
        value={value}
        handleChangeTabs={(newValue) => setValue(newValue)}
      >
        <AppTab data-testid="label-data" label="Dados" index={0} />
        <AppTab data-testid="label-profile" label="Perfil" index={1} />
      </AppTabs>

      <AppTabPanel value={value} index={0}>
        <div data-testid="panel-one">Item One</div>
      </AppTabPanel>

      <AppTabPanel value={value} index={1}>
        <div data-testid="panel-two">Item Two</div>
      </AppTabPanel>
    </>
  )
}

describe('caminho', () => {
  it('Monta component', async () => {
    renderWithRedux(<ComponentTest />)

    const labelData = await screen.findByTestId('label-data')
    const labelProfile = await screen.findByTestId('label-profile')
    const panelOne = await screen.findByTestId('panel-one')

    expect(labelData).toBeTruthy()
    expect(labelProfile).toBeTruthy()
    expect(panelOne).toBeTruthy()
  })

  it('change tabs', async () => {
    renderWithRedux(<ComponentTest />)
    const labelProfile = await screen.findByTestId('label-profile')

    await act(async () => {
      labelProfile.click()
    })

    const panelTwo = await screen.findByTestId('panel-two')

    expect(panelTwo).toBeTruthy()
  })
})
