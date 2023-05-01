import { Container } from './components'

export default function LayoutPublic({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      {children}
    </Container>
  )
}
