import * as React from 'react';
import styled from 'styled-components';

const LogoStyled = styled.span`
  font-size: ${props => props.theme.fontSizeLogo}px;
`;

export const Logo = ({ title }) => {
  return <LogoStyled>{title}</LogoStyled>;
};
