import styled from "@emotion/styled"

export default function LayoutPublic({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      {children}
    </Container>
  )
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`