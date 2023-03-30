import React from 'react'
import styled from 'styled-components'
import { AppText } from './base'

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  border-radius: 0.25rem;
  box-shadow: 2px 4px 6px -1px rgb(0 0 0 / 0.2);
  overflow: hidden;
`
const Desc = styled(p => <AppText variant="body1" {...p} />)`
  width: 0; 
  display: table;
  opacity: 0.5;

  &.MuiTypography-root{
    font-size: 0.875rem;

    @media (min-width: 768px){
      /* font-size: 2.5rem; */
    }
  }
`
const DisplayNumber = styled(p => <AppText variant="body1" {...p} />)`
  text-align: center;
  min-width: 3.5rem;
  line-height: 1rem;
  background: linear-gradient(transparent, rgb(0 0 0 / 0.05));
  border: 1px solid rgb(0 0 0 / 0.1);
  
  @media (min-width: 768px){
    min-width: 5rem;
  }

  &.MuiTypography-root{
    font-size: 2rem;

    @media (min-width: 768px){
      font-size: 2.5rem;
    }
  }
`

interface Props {
  num: string | number
  desc: string
  onClick?: () => void
}
export const BalanceItemDisplayNumber = ({ desc, num, ...rest }: Props) => {
  return (
    <Container {...rest}>
      <DisplayNumber>{num}</DisplayNumber>
      <Desc title={desc}>{desc}</Desc>
    </Container >
  )
}

BalanceItemDisplayNumber.displayName = 'BalanceItemDisplayNumber'