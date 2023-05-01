import styled from "styled-components";
import { AppIcon } from "@/components/base";

export const Loading = () => {
  return (
    <Container>
      <AppIcon variant="spinner" />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  cursor: progress;
  
  position: absolute;
  background-color: rgba(255,255,255, .85);
  
  > * {
    animation: animateRotationLoading 1s infinite;
    font-size: 2rem;
    color: #90caf9;
  }
`