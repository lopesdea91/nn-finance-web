import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/store/hook'
import { Container, Header, Main, Menu } from './styled'
import { useStoreSystem } from '@/hooks/useStoreSystem'

export default function LayoutPrivate({ children }: { children: React.ReactNode }) {
  const { systemState } = useAppSelector((e) => ({
    systemState: e.system
  }))

  const router = useRouter()
  const { loadingPageStart, loadingPageEnd } = useStoreSystem()

  useEffect(() => {
    const handleStart = (url: string) => (url !== router.asPath) && loadingPageStart()
    const handleComplete = (url: string) => (url === router.asPath) && loadingPageEnd()

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)

    return () => {
      router.events.on('routeChangeStart', handleStart)
      router.events.on('routeChangeComplete', handleComplete)
    }
  })

  return (
    <Container status={systemState.menu}>
      <Menu />
      <Header />
      <Main>
        {children}
      </Main>
    </Container>
  )
}
