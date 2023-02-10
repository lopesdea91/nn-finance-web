import React from 'react'
import { Container } from './styled'

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Container>
        {children}
      </Container>
    </>
  )
}
