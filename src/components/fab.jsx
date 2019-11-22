import * as React from 'react';
import styled from 'styled-components';
import { Button } from './button';

export const Fab = styled(Button)`
  position: fixed;
  right: ${props => props.theme.gridSize * 4}px;
  bottom: ${props => props.theme.gridSize * 4}px;
  background-color: ${props => props.theme.themeColor};
  width: ${props => props.theme.gridSize * 7}px;
  height: ${props => props.theme.gridSize * 7}px;
  border-radius: ${props => (props.theme.gridSize * 7) / 2}px;

  &::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 27px;
    background-color: ${props => props.theme.colorInverted};

    left: calc(50% - 1px);
    top: calc(50% - 27px / 2);
  }
  &::after {
    content: '';
    position: absolute;
    width: 27px;
    height: 2px;
    background-color: ${props => props.theme.colorInverted};

    left: calc(50% - 27px / 2);
    top: calc(50% - 1px);
  }
`;
