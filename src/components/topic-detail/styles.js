import styled from 'styled-components';

export const Container = styled.div`
  margin: 4rem;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.span`
  margin-bottom: 1rem;
  font-size: 3rem;
  font-weight: bold;
  color: midnightblue;
  overflow-wrap: break-word;
  word-break: break-all;
`;

export const User = styled.span`
  margin-bottom: 2rem;
  font-size: 1.5rem;
  color: darkorange;
  overflow-wrap: break-word;
`;

export const Description = styled.p`
  font-size: 1rem;
  color: midnightblue;
  overflow-wrap: break-word;
  word-break: break-all;
`;
