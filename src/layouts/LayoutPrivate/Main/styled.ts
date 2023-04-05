import styled from "styled-components";
import { containerGeral, containerResponsive } from "@/constant/styles";

export const Container = styled.div`
  position: relative;
  height: calc(100vh - 4rem - 1.75rem);
  overflow: hidden;
  
  ${containerGeral}
  ${containerResponsive}

  margin-bottom: 0;
`
export const Wrapper = styled.div`
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`
