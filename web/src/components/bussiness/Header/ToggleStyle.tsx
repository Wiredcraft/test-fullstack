// from gastby's website

import React, { FC, MouseEventHandler } from "react";
import styled from "styled-components";
import { Themes, useTheme } from "../../../styles/theme";

const IconWrapper = styled.button`
  padding: 0;
  appearance: none;
  align-items: center;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  display: inline-flex;
  height: 40px;
  justify-content: center;
  margin-right: -11px;
  opacity: 0.75;
  overflow: hidden;
  position: relative;
  transform: scale(0.75);
  transition: all 0.3s ease;
  vertical-align: middle;
  width: 40px;
  outline: none;
  &:hover {
    opacity: 1;
  }
`;

const MoonOrSun = styled.div<{ isDark: boolean }>`
  border: ${p => (p.isDark ? `4px` : `2px`)} solid
    ${({ theme: { colors } }) => colors.icon.light};
  background: ${({ theme: { colors } }) => colors.icon.light};
  border-radius: 50%;
  height: 24px;
  overflow: ${p => (p.isDark ? `visible` : `hidden`)};
  position: relative;
  transform: scale(${p => (p.isDark ? 0.55 : 1)});
  transition: all 0.45s ease;
  width: 24px;
  &::before {
    border-radius: 50%;
    border: 2px solid ${({ theme: { colors } }) => colors.icon.light};
    content: "";
    height: 24px;
    opacity: ${p => (p.isDark ? 0 : 1)};
    position: absolute;
    right: -9px;
    top: -9px;
    transform: translate(${p => (p.isDark ? `14px, -14px` : `0, 0`)});
    transition: transform 0.45s ease;
    width: 24px;
  }
  &::after {
    border-radius: 50%;
    box-shadow: 0 -23px 0 ${({ theme: { colors } }) => colors.icon.light},
      0 23px 0 ${({ theme: { colors } }) => colors.icon.light},
      23px 0 0 ${({ theme: { colors } }) => colors.icon.light},
      -23px 0 0 ${({ theme: { colors } }) => colors.icon.light},
      15px 15px 0 ${({ theme: { colors } }) => colors.icon.light},
      -15px 15px 0 ${({ theme: { colors } }) => colors.icon.light},
      15px -15px 0 ${({ theme: { colors } }) => colors.icon.light},
      -15px -15px 0 ${({ theme: { colors } }) => colors.icon.light};
    content: "";
    height: 8px;
    left: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    width: 8px;
    transform: scale(${p => (p.isDark ? 1 : 0)});
    transition: all 0.35s ease;
  }
`;

const MoonMask = styled.div<{ isDark: boolean }>`
  background: #fff;
  border-radius: 50%;
  border: 0;
  height: 24px;
  opacity: ${p => (p.isDark ? 0 : 1)};
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(${p => (p.isDark ? `14px, -14px` : `0, 0`)});
  transition: background 0.25s ease, transform 0.45s ease;
  width: 24px;
`;

const DarkModeToggle: FC = () => {
  const { setTheme, theme } = useTheme();
  const isDark = theme === Themes.DARK;

  const toggleColorMode: MouseEventHandler = event => {
    event.preventDefault();
    setTheme(isDark ? Themes.LIGHT : Themes.DARK);
  };

  return (
    <IconWrapper
      onClick={toggleColorMode}
      aria-label={isDark ? `Activate light mode` : `Activate dark mode`}
      title={isDark ? `Activate light mode` : `Activate dark mode`}
    >
      <MoonOrSun isDark={isDark} />
      <MoonMask isDark={isDark} />
    </IconWrapper>
  );
};

export default DarkModeToggle;
