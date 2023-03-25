
import Link from "next/link"
import styled from "styled-components"
import { Grid } from "@mui/material"
import { AppText } from "@/components/base"

export const Container = styled(Grid)``

export const Section = styled(Grid)`
  margin-bottom: 1rem;
`

export const SectionTitle = styled(p => <AppText variant="h6" {...p} />)``

export const SectionLinks = styled.div`
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(125px, 1fr));

  @media (min-width: 426px){
    grid-template-columns: repeat( auto-fit, minmax(125px, 180px));
  }
`
export const SectionLink = styled.span`
  margin: 0.25rem;
  padding: 1rem;
  text-decoration: none;
  color: #757575;
  transition: all 0.2s ease-in-out;
  background: linear-gradient(0deg, #eeeeee, #fafafa);
  
  &:hover{
      color: #212121;
      background: #e0e0e0;
  }
`


