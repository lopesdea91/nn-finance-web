
import styled from "styled-components"
import Link from "next/link"

export const SectionLink = styled(Link)`
  display: block;
  max-width: max-content;
  margin: 0.25rem;
  padding: 0.35rem 0.875rem;
  color: #757575;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  
  &:hover{
    color: #212121;
    text-decoration: underline;
  } 
`


