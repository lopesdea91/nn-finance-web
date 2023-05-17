import React from 'react'
import styled from 'styled-components'

const BalanceCardStyle = styled.div`
  max-height: 20rem;
  overflow-y: auto;
  margin-bottom: 1rem;
  padding: 0.5rem 0.25rem;
  display: grid;
  gap: 0.5rem;

  grid-template-columns: repeat( auto-fill, minmax(140px, 1fr));

  @media (min-width: 426px){
    grid-template-columns: repeat( auto-fill, minmax(175px, 1fr));
  }
`

export const BalanceCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <BalanceCardStyle>
      {children}
    </BalanceCardStyle>
  )
}

BalanceCard.displayName = 'BalanceCard'