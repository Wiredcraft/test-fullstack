import * as React from 'react';
import styled from 'styled-components';

const FilteredByStyled = styled.div`
  padding: ${props => props.theme.gridSize * 2}px;
  padding-bottom: 0;
`;

export const FilteredBy = ({ filterInfo }) => {
  if (filterInfo) {
    return (
      <FilteredByStyled>
        {filterInfo.author && <>Filtered by author: {filterInfo.author}</>}
      </FilteredByStyled>
    );
  }
  return null;
};
