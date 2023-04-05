import styled from "styled-components";
import Header from "./Header";
import Main from "./Main";
import { MainTitle } from "./MainTitle";
import Menu from "./Menu";

const Container = styled.div<{ status: boolean }>`
  ${({ status }) => status && { overflow: 'hidden' }};
`

export { Container, MainTitle, Header, Main, Menu }