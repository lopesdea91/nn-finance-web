import React from 'react'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import Loading from '@/layouts/Loading'
import { Container, Wrapper } from './Main.styled'

export default function Main({ children }: { children: React.ReactNode }) {
  const { loading, loadingPage } = useStoreSystem()

  return (
    <Container>
      {loading && <Loading fullContent />}
      <Wrapper>
        {loadingPage && <Loading fullContent />}
        {children}
      </Wrapper>
    </Container>
  )
}
