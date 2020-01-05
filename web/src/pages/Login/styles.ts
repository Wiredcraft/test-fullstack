import styled from "styled-components";
import { Themes } from "../../styles/theme";

export const Left = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
    background: ${({ theme: { colors } }) => colors.background.base};
  }
`;
export const Right = styled.div`
  position: fixed;
  right: 0;
  width: 50%;
  top: 0;
  bottom: 0;
  background: ${({ theme: { theme } }) =>
      `linear-gradient(rgba(0, 0, 0, ${
        theme === Themes.DARK ? "0.5" : "0"
      }), rgba(0, 0, 0, ${theme === Themes.DARK ? "0.5" : "0"}))`},
    url("https://source.unsplash.com/random/1260x1700");
  background-size: cover;
  z-index: -1;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const LoginSection = styled.div`
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 260px;
`;
export const LoginItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

export const Split = styled.span`
  color: ${({ theme: { colors } }) => colors.text.base};
  margin: 0 8px;
`;
