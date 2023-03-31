import { Box } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

interface ConsolidateLabelsProps {
  children: React.ReactNode
}
export const ConsolidateLabels = ({ children }: ConsolidateLabelsProps) => {
  return (
    <Container sx={{ p: 1 }}>
      {children}
    </Container>
  )
}

const Container = styled(Box)`
  border: 1px solid rgba(0, 0, 0, 0.12);

  @media (min-width:426px) {
    max-height: 10rem;
    overflow-y: scroll;
  }
`


