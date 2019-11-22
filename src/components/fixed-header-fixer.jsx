import styled from 'styled-components';

export const FixedHeaderFixer = styled.div`
  height: ${props =>
    props.theme.fixedHeader ? props.theme.gridSize * 8 : 0}px;
`;
