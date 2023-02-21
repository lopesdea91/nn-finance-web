import React from 'react'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { HeaderBtn, Container, InputPeriod, InputsWrapper, SelectWallet } from './Header.styled'
import { useStoreFinance } from '@/hooks/useStoreFinance'

export default function Header() {
  const { systemState, dispatchSetPeriod, dispatchSetWalletPanelId, dispatchToggleMenu } = useStoreSystem()
  const { financeState } = useStoreFinance()

  return (
    <Container>
      <InputsWrapper>
        <InputPeriod
          label="Periodo"
          type="month"
          value={systemState.period || ''}
          onChange={(e) => dispatchSetPeriod(e.target.value)}
        />

        <SelectWallet
          label="Carteira finança"
          value={systemState.walletPanelId || ''}
          options={financeState.wallet.map(el => ({ id: el.id, description: el.description }))}
          onChange={(e) => dispatchSetWalletPanelId(Number(e.target.value))}
        />
      </InputsWrapper>
      <HeaderBtn onClick={() => dispatchToggleMenu()} variant="menu" />
    </Container>
  )
}
