import { useStoreSystem } from '@/hooks/useStoreSystem'
import Loading from '@/layouts/Loading'
import { actionsSystemSlice } from '@/store/features/system'
import { useAppDispatch } from '@/store/hook'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
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
