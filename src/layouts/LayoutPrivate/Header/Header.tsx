import React from 'react'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { HeaderBtn, Container, InputPeriod, InputsWrapper, SelectWallet } from './Header.styled'
import { useStoreFinance } from '@/hooks/useStoreFinance'
import { $cookie } from '@/utils'

export default function Header() {
  const { systemState, dispatchSetPeriod, dispatchSetWalletPanelId, dispatchToggleMenu } = useStoreSystem()
  const { financeState } = useStoreFinance()

  async function handlePeriod(period: string) {
    $cookie.set({
      key: 'period',
      value: period,
      options: { path: '/' },
    })

    dispatchSetPeriod(period)
  }
  function handleWalletPanelId(walletPanelId: number) {
    $cookie.set({
      key: 'walletPanelId',
      value: String(walletPanelId),
      options: { path: '/' },
    })

    dispatchSetWalletPanelId(walletPanelId)
  }

  return (
    <Container>
      <InputsWrapper>
        <InputPeriod
          label="Periodo"
          type="month"
          value={systemState.period || ''}
          onChange={(e) => handlePeriod(e.target.value)}
        />

        <SelectWallet
          label="Carteira finança"
          value={systemState.walletPanelId || ''}
          options={financeState.wallet.map(el => ({ id: el.id, description: el.description }))}
          onChange={(e) => handleWalletPanelId(Number(e.target.value))}
        />
      </InputsWrapper>
      <HeaderBtn onClick={() => dispatchToggleMenu()} variant="menu" />
    </Container>
  )
}
