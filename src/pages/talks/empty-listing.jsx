import * as React from 'react';
import styled from 'styled-components';

const EmptyListingStyled = styled.p`
  margin-top: ${props => props.theme.gridSize * 9}px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  padding: ${props => props.theme.gridSize * 2}px;
`;

export const EmptyListing = ({ children }) => {
  return <EmptyListingStyled>{children}</EmptyListingStyled>;
};
