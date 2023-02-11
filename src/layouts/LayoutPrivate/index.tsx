import React from 'react'
import { Container } from './styled'

export default function LayoutPrivate({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      {children}
    </Container>
  )
}
