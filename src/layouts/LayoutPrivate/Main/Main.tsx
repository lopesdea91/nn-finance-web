import React from 'react'
import { MainContainer } from '@/styles/layout/private.styled'

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <MainContainer>
      {children}
    </MainContainer>
  )
}
