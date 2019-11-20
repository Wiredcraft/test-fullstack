import * as React from 'react';
import styled from 'styled-components';

const ButtonStyled = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  width: ${props => (props.expand ? '100%' : 'auto')};
  height: ${props => (props.expand ? '100%' : 'auto')};
  overflow: visible;

  color: ${props =>
    props.primary ? props.theme.colorInverted : props.theme.color};
  background-color: ${props =>
    props.primary ? props.theme.themeColor : 'transparent'};
`;

/**
 *
 * @param {*} param0 {}
 * @param {*} param0.primary Is this button a primary button (use themeColor)
 * @param {*} param0.expand Take the whole parent space
 */
export const Button = ({ children, onClick, ...props }) => {
  return (
    <ButtonStyled onClick={onClick} {...props}>
      {children}
    </ButtonStyled>
  );
};
