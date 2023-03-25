import { useStoreSystem } from '@/hooks/useStoreSystem'
import { Container, Header, Main, Menu } from './styled'

export default function LayoutPrivate({ children }: { children: React.ReactNode }) {
  const { menu, loading } = useStoreSystem()

  return (
    <Container status={menu}>
      <Menu />
      <Header />
      <Main loading={loading}>
        {children}
      </Main>
    </Container>
  )
}
