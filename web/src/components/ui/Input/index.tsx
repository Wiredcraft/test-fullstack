import React, { FC, InputHTMLAttributes } from "react";
import styled from "styled-components";

const Container = styled.input`
  color: ${({ theme: { colors } }) => colors.text.base};
  width: 100%;
  height: 32px;
  background: transparent;
  outline: none;
  border: none;
  box-shadow: 0 1px 0 ${({ theme: { colors } }) => colors.border.base};
  transition: box-shadow, 0.3s ease;
  &:focus {
    box-shadow: 0 3px 0 ${({ theme: { colors } }) => colors.border.light};
  }
`;

type Props = InputHTMLAttributes<HTMLInputElement>;

const Input: FC<Props> = ({ ...props }) => {
  return <Container {...props} />;
};

export default Input;
