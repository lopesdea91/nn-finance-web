import styled from "styled-components";

interface MenuContainerProps {
  status: boolean
}
export const MenuContainer = styled.div<MenuContainerProps>`
  background: #fff;
  z-index: 2;
  position: fixed;
  top: 4rem;
  left: 0.25rem;
  right: 0.25rem;
  bottom: 0.25rem;

  padding: 1rem;
  
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px 8px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.05);
  transition: all 0.3s;
  overflow: hidden;

  ${({ status }) => status ? {
    opacity: 1,
    visibility: 'visible',
    right: '0.25rem'
  } : {
    opacity: 0,
    visibility: 'hidden',
    right: '75%'
  }}
`
