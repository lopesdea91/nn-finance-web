import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { SystemStore } from '@/store/hook'
import { Container, Header, Main, Menu } from './components'

export default function LayoutPrivate({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const systemStore = SystemStore()

  useEffect(() => {
    router.events.on('routeChangeStart', () => systemStore.loadingPageStart())
    router.events.on('routeChangeComplete', () => systemStore.loadingPageEnd())
  }, [])

  return (
    <Container status={systemStore.state.menu}>
      <Menu />
      <Header />
      <Main>
        {children}
      </Main>
    </Container>
  )
}