import Loading from '@/layouts/Loading'
import React from 'react'
import { Container, Wrapper } from './Main.styled'

export default function Main({ children, loading }: { children: React.ReactNode, loading: boolean }) {
  return (
    <Container>
      {loading && <Loading fullContent />}
      <Wrapper>
        {children}
      </Wrapper>
    </Container>
  )
}
