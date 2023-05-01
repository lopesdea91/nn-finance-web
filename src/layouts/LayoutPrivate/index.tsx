import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { SystemStore, useAppSelector } from '@/store/hook'
import { Container, Header, Main, Menu, Toast } from './components'

export default function LayoutPrivate({ children }: { children: React.ReactNode }) {
  const { systemState } = useAppSelector((e) => ({
    systemState: e.system
  }))

  const router = useRouter()
  const systemStore = SystemStore()

  useEffect(() => {
    const handleStart = (url: string) => (url !== router.asPath) && systemStore.loadingPageStart()
    const handleComplete = (url: string) => (url === router.asPath) && systemStore.loadingPageEnd()

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)

    return () => {
      router.events.on('routeChangeStart', handleStart)
      router.events.on('routeChangeComplete', handleComplete)
    }
  })

  return (
    <Container status={systemState.menu}>
      <Toast />
      <Menu />
      <Header />
      <Main>
        {children}
      </Main>
    </Container>
  )
}