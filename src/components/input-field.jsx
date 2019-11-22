import * as React from 'react';
import styled from 'styled-components';

import { newId } from './id';

const LabelStyled = styled.label`
  display: block;
  margin-top: ${props => props.theme.gridSize * 2}px;
  font-size: ${props => props.theme.fontSizeBig}px;
  line-height: 150%;
`;

const ErrorMsgStyled = styled.div`
  font-size: ${props => props.theme.fontSizeSmall}px;
  color: ${props => props.theme.colorError};
`;

const InputStyled = styled.input`
  margin-top: ${props => props.theme.gridSize}px;
  width: 100%;
  max-width: 100%;
  height: ${props => props.theme.gridSize * 6}px;
  border: ${props =>
    props.error && props.touched
      ? '1px solid ' + props.theme.colorError
      : 'none'};
  border-radius: ${props => props.theme.borderRadius}px;
  box-sizing: border-box;
  padding: 0 ${props => props.theme.gridSize * 2}px;
  background-color: ${props => props.theme.colorInputBg};
  font-size: ${props => props.theme.fontSizeBig}px;
`;

/**
 * @extends <input />
 */
export const InputField = ({
  type = 'text',
  label,
  id = newId(),
  ...props
}) => {
  return (
    <>
      <LabelStyled htmlFor={id}>{label}</LabelStyled>
      {props.error && props.touched ? (
        <ErrorMsgStyled>{props.error}</ErrorMsgStyled>
      ) : null}
      <InputStyled type={type} id={id} {...props} />
    </>
  );
};
