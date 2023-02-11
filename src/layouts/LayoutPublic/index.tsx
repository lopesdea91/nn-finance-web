import React from 'react'
import { Container } from './styled'

export default function LayoutPublic({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Container>
        {children}
      </Container>
    </>
  )
}
