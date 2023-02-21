import { createGlobalStyle } from "styled-components";
import { config, dom } from "@fortawesome/fontawesome-svg-core";

// Prevent FA from adding the CSS
// (not that it was doing it in the first place but might as well)
config.autoAddCss = false;

// Add the FA CSS as part of Global Styles
export const GlobalStyles = createGlobalStyle`
    ${dom.css()}
`;