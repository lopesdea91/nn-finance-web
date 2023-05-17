import { useAppSelector } from '@/store/hook'
import styled, { containerGeral, containerResponsive } from '@/@core/presentation/layouts/types/private/components/_styled'
import { Loading } from '@/@core/presentation/layouts/components'

export const Main = ({ children }: { children: React.ReactNode }) => {
  const { systemState } = useAppSelector(e => ({
    systemState: e.system
  }))

  return (
    <Container>
      <Wrapper className='wrapper-main'>
        {systemState.loadingPage && <Loading />}
        {children}
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  height: calc(100vh - 4.25rem);
  overflow: hidden;

  @media (min-width: 467px) {
    height: calc(100vh - 4rem - 1.75rem);
  }

  ${containerGeral}
  ${containerResponsive}

  margin-bottom: 0;
`
const Wrapper = styled.div`
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;

  display: flex;
  flex-direction: column;
  overflow: hidden;

  .section + .section  {
    margin-bottom: 1rem;
  }
`
