
import styled from "styled-components"
import Link from "next/link"

export const SectionLink = styled(Link)`
  text-decoration: none;
  display: block;
  padding: 0.35rem 0.875rem;
  min-height: 6.5rem;
  color: unset;
  border: 1px solid #75757555;
  border-radius: 0.25rem;
  transition: all 0.2s ease-in-out;
  
  &:hover{
    color: #212121;
  }
`


