import styled from "styled-components";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Menu from "./Menu/Menu";

interface MenuContainerProps {
  status: boolean
}

export const Container = styled.div<MenuContainerProps>`
  ${({ status }) => status && { overflow: 'hidden' }};
`

export { Header, Main, Menu }