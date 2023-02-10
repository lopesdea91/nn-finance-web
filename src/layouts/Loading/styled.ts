import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @keyframes rotation {
    0% {
      opacity: 0.75;
      transform: rotate(0)
    }
    80% {
      opacity: 1;
    }
    100% {
      transform: rotate(360deg)
    }
  }

  > * {
    animation: rotation 1s infinite;
    font-size: 2rem;
    color: #90caf9;
  }
`