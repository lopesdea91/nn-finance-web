import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { actionsSystemSlice } from '@/store/features/system'
import { useAppDispatch } from '@/store/hook'
import { Container, Header, Main, Menu } from './styled'

export default function LayoutPrivate({ children }: { children: React.ReactNode }) {
  const { menu } = useStoreSystem()

  const router = useRouter()
  const dispatch = useAppDispatch()

  const setLoading = (value: boolean) => {
    dispatch(actionsSystemSlice.setloadingPage(value))
  }

  useEffect(() => {
    const handleStart = (url: string) => (url !== router.asPath) && setLoading(true)
    const handleComplete = (url: string) => (url === router.asPath) && setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)

    return () => {
      router.events.on('routeChangeStart', handleStart)
      router.events.on('routeChangeComplete', handleComplete)
    }
  })

  return (
    <Container status={menu}>
      <Menu />
      <Header />
      <Main>
        {children}
      </Main>
    </Container>
  )
}
