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

const TextAreaStyled = styled.textarea`
  margin-top: ${props => props.theme.gridSize}px;
  width: 100%;
  max-width: 100%;
  min-height: ${props =>
    // default to 4 lines
    props.theme.fontSizeBig * 1.5 * (props.rows || 4) +
    props.theme.gridSize * 2}px;
  line-height: 150%;
  border: ${props =>
    props.error && props.touched
      ? '1px solid ' + props.theme.colorError
      : 'none'};
  border-radius: ${props => props.theme.borderRadius}px;
  box-sizing: border-box;
  padding: ${props => props.theme.gridSize}px
    ${props => props.theme.gridSize * 2}px;
  background-color: ${props => props.theme.colorInputBg};
  font-size: ${props => props.theme.fontSizeBig}px;
`;

/**
 * @extends <input />
 */
export const TextAreaField = ({ label, id = newId(), ...props }) => {
  return (
    <>
      <LabelStyled htmlFor={id}>{label}</LabelStyled>
      {props.error && props.touched ? (
        <ErrorMsgStyled>{props.error}</ErrorMsgStyled>
      ) : null}
      <TextAreaStyled id={id} {...props} />
    </>
  );
};
