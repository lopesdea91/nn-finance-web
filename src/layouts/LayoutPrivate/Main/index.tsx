import { Loading } from '@/components/layout/Loading'
import { useAppSelector } from '@/store/hook'
import { Container, Wrapper } from './styled'

export default function Main({ children }: { children: React.ReactNode }) {
  const { systemState } = useAppSelector(e => ({
    systemState: e.system
  }))

  return (
    <Container>
      <Wrapper>
        {systemState.loadingPage && <Loading />}
        {children}
      </Wrapper>
    </Container>
  )
}
