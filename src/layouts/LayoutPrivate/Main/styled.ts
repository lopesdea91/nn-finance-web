import styled from "styled-components";
import { containerGeral, containerResponsive } from "@/constant/styles";

export const Container = styled.div`
  position: relative;
  ${containerGeral}
  ${containerResponsive}
`
export const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`
