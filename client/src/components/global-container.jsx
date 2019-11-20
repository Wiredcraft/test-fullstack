import styled from 'styled-components';

export const GlobalContainer = styled.div`
  font-family: ${props => props.theme.fontFamily};
  color: ${props => props.theme.color};
  font-size: ${props => props.theme.fontSize};
`;
