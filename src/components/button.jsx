import * as React from 'react';
import styled from 'styled-components';

import { Image } from './image';

const ImageStyled = styled(Image)``;

const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  border: none;
  width: ${props => (props.expand ? '100%' : 'auto')};
  height: ${props => (props.expand ? '100%' : 'auto')};
  overflow: visible;

  -webkit-tap-highlight-color: rgba(39, 174, 96, 0.5);
  color: ${props =>
    // For button color, if primary button, auto white, if specified as inverted, make it white
    props.primary || props.inverted
      ? props.theme.colorInverted
      : props.theme.color};
  background-color: ${props => {
    if (props.primary) return props.theme.themeColor;
    else if (props.transparent) return 'transparent';
    else if (props.backgroundColor) return props.backgroundColor;
    else return props.theme.colorLight;
  }};
`;

/**
 * @extends <button />
 * @param {*} param0 {}
 * @param {*} param0.primary Is this button a primary button (use themeColor as background)
 * @param {*} param0.inverted Invert text color
 * @param {*} param0.transparent Make background transparent
 * @param {*} param0.backgroundColor Specify background color
 * @param {*} param0.expand Take the whole parent space
 * @param {*} param0.icon Icon component, will be rendered as is
 */
export const Button = ({
  component,
  children,
  icon: IconComponent,
  iconImgWidth = 32,
  onClick,
  ...props
}) => {
  return (
    <ButtonStyled onClick={onClick} {...props}>
      {IconComponent}
      {children}
    </ButtonStyled>
  );
};
