import React from 'react'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { HeaderBtn, Container, InputPeriod, InputsWrapper, SelectWallet } from './styled'
import { $cookie } from '@/utils'
import { useAppSelector } from '@/store/hook'

export default function Header() {
  const { setPeriod, setWalletPanelId, toggleMenu } = useStoreSystem()
  const { systemState, financeState } = useAppSelector((e) => ({
    systemState: e.system,
    financeState: e.finance
  }))

  async function handlePeriod(period: string) {
    $cookie.set({
      key: 'period',
      value: period,
      options: { path: '/' },
    })

    setPeriod(period)
  }
  function handleWalletPanelId(walletPanelId: number) {
    $cookie.set({
      key: 'walletPanelId',
      value: String(walletPanelId),
      options: { path: '/' },
    })

    setWalletPanelId(walletPanelId)
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
      <HeaderBtn onClick={() => toggleMenu()} variant="menu" />
    </Container>
  )
}
