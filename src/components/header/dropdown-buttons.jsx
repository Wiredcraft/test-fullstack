import * as React from 'react';
import styled from 'styled-components';
import { Button } from '../button';

const ButtonsStyled = styled.div`
  position: absolute;
  left: 0;
  top: ${props => props.theme.gridSize * 8}px;
  width: 100%;
`;

const ButtonStyled = styled(Button)`
  width: 100%;
  height: ${props => props.theme.gridSize * 6}px;
  background-color: ${props => props.theme.themeColor};
  justify-content: flex-end;
  padding-right: ${props => props.theme.gridSize * 3}px;
`;

export const DropdownButtons = ({ children }) => {
  return <ButtonsStyled>{children}</ButtonsStyled>;
};

export const MenuDropDownButton = ({ label, action }) => {
  return (
    <ButtonStyled onClick={action} inverted>
      {label}
    </ButtonStyled>
  );
};
