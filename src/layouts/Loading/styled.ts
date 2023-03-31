import styled from "styled-components";

interface ContainerProps {
  fullPage?: true
  fullContent?: true
}
export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  cursor: progress;
  
  ${({ fullPage }) => fullPage && {
    minHeight: '100vh'
  }}
  ${({ fullContent }) => fullContent && {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: '#ffffff95'
  }}
  
  @keyframes animateRotationLoading {
    0% {
      opacity: 0.85;
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
    animation: animateRotationLoading 1s infinite;
    font-size: 2rem;
    color: #90caf9;
  }
`