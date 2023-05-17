import React from 'react'
import styled from 'styled-components'
import { AppText } from './base'


const Container = styled.div`
  padding: 0.5rem 0.5rem 0;
  box-shadow: 2px 4px 6px -1px rgb(0 0 0 / 0.2);
  border: 1px solid rgb(0 0 0 / 0.2);
  cursor: pointer;
`
const Title = styled(p => <AppText variant="body1" {...p} />)`
  min-height: 25px;
  border-bottom: 1px solid rgb(0 0 0 / 0.2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Value = styled(p => <AppText variant="body1" {...p} />)`
  min-height: 56px;
  text-align: right;
  
  &.MuiTypography-root{
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 1.25rem;
    line-height: 3.5rem;

    &::before {
      content: attr(data-prefix);
      font-size: 0.85rem;
      margin-right: 0.15rem;
      font-family: monospace;
    }

    @media (min-width: 768px){
      font-size: 1.75rem;
    }
  }
`

interface Props {
  title: string
  prefix?: string
  value: string | number
  onClick?: () => void
}
export const BalanceItem = ({ title, value, prefix, ...rest }: Props) => {
  return (
    <Container {...rest}>
      <Title title={title}>{title}</Title>
      <Value data-prefix={prefix}>{value}</Value>
    </Container >
  )
}

BalanceItem.displayName = 'BalanceItem'