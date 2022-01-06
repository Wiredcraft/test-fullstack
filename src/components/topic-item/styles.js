import styled from 'styled-components';

export const Container = styled.div`
  height: 5rem;
  overflow-y: hidden;
  width: 100%;
  border-bottom: 1px solid midnightblue;
  display: flex;
  align-content: space-between;
  align-items: center;
`;

export const TitleContainer = styled.div`
  margin-left: 2rem;
  cursor: pointer;
`;

export const Title = styled.div`
  width: 100%;
  font-size: 1.75rem;
  font-weight: bold;
  color: midnightblue;
  margin-bottom: 0.25rem;
`;

export const User = styled.div`
  width: 100%;
  margin-left: 1rem;
  color: darkorange;
`;
