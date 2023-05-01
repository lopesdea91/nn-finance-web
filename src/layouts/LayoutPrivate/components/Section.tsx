import styled from 'styled-components'
import { containerResponsivePadding } from './_styled'

interface Section {
  children: React.ReactNode
  className?: HTMLDivElement['className']
}
export const Section = ({ children, ...rest }: Section) => {

  return (
    <SectionStyled className="section" {...rest}>
      {children}
    </SectionStyled>
  )
}

const SectionStyled = styled.div`
  background: white;
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.02);
  ${containerResponsivePadding}

  &.listing {
    display: flex;
    flex-direction: column;
    overflow: hidden;

    @media (max-width: 768px){
      flex: 1;
    }
  }
`