import { useStoreSystem } from '@/hooks/useStoreSystem'
import React from 'react'
import { Container, Header, Main, Menu } from './styled'

export default function LayoutPrivate({ children }: { children: React.ReactNode }) {
  const { systemState } = useStoreSystem()

  return (
    <Container status={systemState.menu}>
      <Menu />
      <Header />
      <Main loading={systemState.loading}>
        {children}
      </Main>
    </Container>
  )
}
