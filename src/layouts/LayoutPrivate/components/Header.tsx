import React from 'react'
import { SystemStore, useAppSelector } from '@/store/hook'
import { AppButtonIcon, AppInput, AppSelect } from '@/components/base'
import styled, { containerGeral, containerResponsive, containerResponsivePadding } from '@/layouts/LayoutPrivate/components/_styled'

export const Header = () => {
  const systemStore = SystemStore()

  const { systemState, financeState } = useAppSelector((e) => ({
    systemState: e.system,
    financeState: e.finance
  }))
  async function handlePeriod(period: string) {
    systemStore.setPeriod(period)
  }
  function handleWalletPanelId(walletPanelId: number) {
    systemStore.setWalletPanelId(walletPanelId)
  }

  return (
    <Container>
      <InputsWrapper>
        <AppInput
          labelProps={{
            label: "Periodo"
          }}
          inputProps={{
            type: "month",
            value: systemState.period || '',
            onChange: (e) => handlePeriod(e.target.value)
          }}
        />

        <AppSelect
          label="Carteira finança"
          value={systemState.walletPanelId || ''}
          options={financeState.wallet.map(el => ({ id: el.id, description: el.description }))}
          onChange={(e) => handleWalletPanelId(Number(e.target.value))}
        />
      </InputsWrapper>
      <HeaderBtn onClick={() => systemStore.toggleMenu()} variant="menu" />
    </Container>
  )
}

const Container = styled.div`
  background: white;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);

  min-height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 0.5rem;

  ${containerGeral}
  ${containerResponsive}
  ${containerResponsivePadding}
  
  @media (min-width: 426px) {
    min-height: 4rem;
    padding: 1.15rem 0.75rem 0.75rem !important;
  }

  .MuiButton-outlined {
    border-color: rgb(0 0 0 / 10%);
  }
`
const InputsWrapper = styled.div`
  display: none;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 426px) {
    display: flex;
  }
  @media (min-width: 768px) {
    width: 400px;
  }
`
const HeaderBtn = styled(AppButtonIcon)`
  @media (min-width: 426px){
    &.MuiButton-root {
      display: none;
    }
  }
`