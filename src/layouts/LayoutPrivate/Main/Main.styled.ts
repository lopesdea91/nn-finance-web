import { containerGeral, containerResponsive, containerResponsivePadding } from "@/constant/styles";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;

  ${containerGeral}
  ${containerResponsive}
`
export const Wrapper = styled.div`
  background: white;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.02), 0 2px 4px -2px rgb(0 0 0 / 0.02);
  min-height: 50vh;
  max-width: 990px;
  margin: 0 auto;
  padding: 0.5rem 0.75rem;

  @media (min-width: 426px) {
    min-height: calc(100vh - 5rem);
  }
  @media (min-width: 768px) {
    min-height: calc(100vh - 5rem - 4rem);
  }

  ${containerResponsivePadding}
`
