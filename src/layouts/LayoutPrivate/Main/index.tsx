import { Container, Wrapper } from './styled'

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Wrapper>
        {children}
      </Wrapper>
    </Container>
  )
}
