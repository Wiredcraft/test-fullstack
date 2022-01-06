import styled from 'styled-components';

export const Container = styled.tr`
  height: 5rem;
  overflow: hidden;
  width: 100%;
  border-bottom: 1px solid darkorange;
  align-content: space-between;
  align-items: center;
`;

export const RatingContainer = styled.td`
  width: 11rem;
`;

export const TitleContainer = styled.td`
  margin-left: 2rem;
  cursor: pointer;
`;

export const Title = styled.div`
  width: 100%;
  font-size: 1.75rem;
  font-weight: bold;
  color: midnightblue;
  margin-bottom: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const User = styled.div`
  width: 100%;
  margin-left: 1rem;
  color: darkorange;
`;
