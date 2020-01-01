import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";

const GlobalStyle = createGlobalStyle`
  ${normalize()};
  body {
    padding-top: 60px;
    background: ${({ theme: { colors } }) => colors.background.base};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  }
  *, *:before, *:after {
    box-sizing: border-box;
  }
  // transition for theme change
  * {
    transition: color .3s ease, background .3s ease;
  }
`;
export default GlobalStyle;
