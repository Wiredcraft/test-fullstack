import styled from 'styled-components';

export const Title = styled.div`
  margin-top: ${props => props.theme.gridSize}px;
  font-size: ${props => props.theme.fontSizeMega}px;
  padding: ${props => props.theme.gridSize * 2}px;
  font-weight: bold;
`;
