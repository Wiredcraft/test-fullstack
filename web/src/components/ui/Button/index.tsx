import React, { ButtonHTMLAttributes, FC } from "react";
import styled, { css } from "styled-components";
import { rgba } from "polished";
import * as tokens from "../../../styles/tokens";

type ButtonType = "primary" | "translucent";
type ButtonSize = "small" | "middle" | "large";

const translucent = css`
  border: none;
  background: ${({ theme: { colors } }) => rgba(colors.primary.base, 0.12)};
  color: ${({ theme: { colors } }) => colors.primary.base};
`;
const primary = css`
  color: ${tokens.colors.white};
  border: none;
  background: ${({ theme: { colors } }) => colors.primary.base};
`;

const buttonCSS = {
  translucent,
  primary
};
const sizes = {
  small: 24,
  middle: 32,
  large: 40
};

interface Props {
  variant?: ButtonType;
  size?: ButtonSize;
}

const Container = styled.button<Required<Props>>`
  border-radius: ${({ size }) => `${sizes[size] / 2}px`};
  font-weight: 500;
  font-variant: all-small-caps;
  font-size: ${({ size }) => `${sizes[size] / 2}px`};
  height: ${({ size }) => `${sizes[size]}px`};
  min-width: ${({ size }) => `${sizes[size] * 2}px`}
  padding: ${({ size }) => `0 ${sizes[size] / 2}px`};
  cursor: pointer;
  outline: none;
  ${({ variant }) => buttonCSS[variant]};
  &:disabled {
   opacity: 0.6;
   cursor: not-allowed;
  }
`;

const Button: FC<Props & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  variant = "primary",
  size = "middle",
  children,
  ...otherProps
}) => {
  return (
    <Container variant={variant} size={size} {...otherProps}>
      {children}
    </Container>
  );
};

export default Button;
