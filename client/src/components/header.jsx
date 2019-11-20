import * as React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${props => props.theme.gridSize * 2}px;
  height: ${props => props.theme.gridSize * 8}px;
  background: ${props => props.theme.themeColor};
  color: ${props => props.theme.colorInverted};
`;

const LogoStyled = styled.span`
  font-size: ${props => props.theme.fontSizeLogo}px;
`;

const Logo = ({ title }) => {
  return <LogoStyled>{title}</LogoStyled>;
};

const MenuButtons = () => {
  return <span>Sign In</span>;
};

export const Header = () => {
  const title = 'Lightning Talks';
  return (
    <HeaderWrapper>
      <Logo title={title} />
      <MenuButtons />
    </HeaderWrapper>
  );
};
